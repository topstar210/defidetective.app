import { useEffect, useState } from "react";
import Web3 from "web3";
import {
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CModalTitle,
    CButton,
    CFormInput,
    CRow,
    CCol
} from '@coreui/react'
import { allAbi } from "src/abis/allAbi";
import { useDispatch } from "react-redux";
import { config } from "src/config";
import { useAuthContext } from 'src/provider/AuthProvider';
import { ContractContext } from "src/provider/ContractProvider";

const BUSDModal = (props) => {
    console.log("BUSDMODAL: ", props.selectedData);
    console.log("ERC20: ", allAbi.ERC20);
    const dispatch = useDispatch();
    const { address, chainId } = useAuthContext();

    const [contract, setContract] = useState();
    const [busdContract, setBusdContract] = useState();
    const [web3, setWeb3, setSnackbar] = useState();
    const [wrongNetwork, setWrongNetwork] = useState(false);
    const BSCChainID = 56;

    useEffect(() => {
        if (!chainId) {
          return;
        }
        if (parseInt(chainId) !== BSCChainID) {
            console.log("BUSD Chain ID: ", chainId, " : ", BSCChainID);
            setSnackbar({
            type: "error",
            message: "Wrong network",
          });
          setWrongNetwork(true);
          return;
        }
        setWrongNetwork(false);
        const web3Instance = new Web3();
        web3Instance.setProvider(Web3.givenProvider);
    
        setWeb3(web3Instance);
        const contract = new web3Instance.eth.Contract(allAbi.WCMINER, '0xBcae54cdF6a1b1C60Ec3d44114B452179A96C1e3');
        setContract(contract);
        
        const busdContract = new web3Instance.eth.Contract(allAbi.ERC20, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');
        setBusdContract(busdContract);
      }, [chainId]);

    console.log("busdmodal-address: ", address, chainId);
    const [roiAppState, setRoiAppState] = useState({});
    const [amount, setAmount] = useState(0);

    const handleChange = (e) => {
        if (e.target.value < 0) return;
        setAmount(e.target.value);
    }

    const handleClickApprove = async() => {
        await busdContract.methods.approve('0xBcae54cdF6a1b1C60Ec3d44114B452179A96C1e3', Web3.utils.toWei(amount.toString())).
            send({from: address});
    }
    
    const handleClickStake = async() => {
        await contract.methods.stakeStablecoins(Web3.utils.toWei(amount.toString()), config.refAddress).
            send({from: address});
    }
    
    const handleClickCompound = async() => {
        await contract.methods.compound().send({from: address});
    }

    const handleClickWithdraw = async() => {
        await contract.methods.withdrawDivs().send({from: address});
    }

    useEffect(() => {
        setRoiAppState({
            ...props.selectedData,
            mining_group_name: props.selectedData.mining_group,
            age: props.selectedData.ages,
            token: props.selectedData.coin_token,
            showflag: props.selectedData.show_flag ? "show" : "hide"
        });
    }, [props.selectedData])

    return (
        <CModal visible={props.visible} onClose={() => props.setMVisible(false)}>
            <CModalHeader>
                <CModalTitle>{ props.selectedData.mining_group }</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol>
                        <CFormInput
                            type="number"
                            step="10"
                            id="mining_group_url"
                            label="Approve Amount"
                            value={ amount }
                            onChange={(e) => handleChange(e)}
                            placeholder="50 BUSD"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <div className="d-flex justify-content-between">
                            <CButton color="success" onClick={ handleClickApprove }>Approve</CButton>
                            <CButton color="secondary" className="ms-2" onClick={ handleClickStake }>Stake</CButton>
                            <CButton color="success" onClick={ handleClickCompound }>Compound</CButton>
                            <CButton color="success" className="ms-2" onClick={ handleClickWithdraw }>Withdraw</CButton>
                        </div>
                    </CCol>
                </CRow>
            </CModalBody>
            {/* <CModalFooter>
                <CButton color="success" onClick={() => handleClickSubmit()}>SAVE</CButton>
                <CButton color="secondary" onClick={() => props.setMVisible(false)}>
                    CLOSE
                </CButton>
            </CModalFooter> */}
        </CModal>
    )
}
export default BUSDModal;