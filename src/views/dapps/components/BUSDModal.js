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
    const dispatch = useDispatch();
    const { address, chainId, setSnackbar } = useAuthContext();

    const [minerContract, setMinerContract] = useState();
    const [contractAddress, setContractAddress] = useState();
    const [tokenContract, setTokenContract] = useState();
    const [web3, setWeb3] = useState();
    const [wrongNetwork, setWrongNetwork] = useState(false);

    useEffect(() => {
        const init = () => {
            if (props.selectedData.id === undefined) return;
            const chain = props.selectedData.contract.includes('bsc') ? 56 : (props.selectedData.contract.includes('polygon') ? 137 : 0);
            if (!chainId) {
              return;
            }
            if (parseInt(chainId) !== chain) {
                console.log("BUSD Chain ID: ", chainId, " : ", chain);
                setSnackbar({
                    type: "error",
                    message: "Wrong network",
                });
                setWrongNetwork(true);
              return;
            }
            setWrongNetwork(false);
            let web3Instance = new Web3();
            // if (chain == 56) {
            //     web3Instance = new Web3("https://bsc-dataseed1.binance.org/");
            // } else if (chain ==  137) {
            //     web3Instance = new Web3('https://polygon-rpc.com/');
            // } else {
            //     web3Instance = new Web3('https://api.avax.network/ext/bc/C/rpc');
            // }
            web3Instance.setProvider(Web3.givenProvider);
            setWeb3(web3Instance);
        
            const contractAddress = props.selectedData.contract.slice(props.selectedData.contract.length - 42);
            console.log('contractAddress: ', contractAddress);
            setContractAddress(contractAddress);
            const minerContract = new web3Instance.eth.Contract(allAbi.WCMINER, contractAddress);
            console.log('minerContract: ', minerContract);
            
            setMinerContract(minerContract);
            
            let tokenAddress;
            if (chain == 56 && props.selectedData.coin_token == 'BUSD') {
                console.log("herehereherehere")
                tokenAddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
            } else if (chain == 137 && props.selectedData.coin_token == 'USDT') {
                tokenAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
            }
            const tokenContract = new web3Instance.eth.Contract(allAbi.ERC20, tokenAddress);
            console.log("tokenContract: ", tokenContract);
            setTokenContract(tokenContract);
        }
        init();
      }, [props.selectedData]);

    const [amount, setAmount] = useState(0);

    const handleChange = (e) => {
        if (e.target.value < 0) return;
        setAmount(e.target.value);
    }

    const handleClickApprove = async() => {
        // console.log("approve: ", tokenContract, contractAddress, amount);

        await tokenContract.methods.approve(contractAddress, Web3.utils.toWei(amount.toString())).
            send({from: address});
    }
    
    const handleClickStake = async() => {
        await minerContract.methods.stakeStablecoins(Web3.utils.toWei(amount.toString()), config.refAddress).
            send({from: address});
    }
    
    const handleClickCompound = async() => {
        await minerContract.methods.compound().send({from: address});
    }

    const handleClickWithdraw = async() => {
        await minerContract.methods.withdrawDivs().send({from: address});
    }

    // useEffect(() => {
    //     setRoiAppState({
    //         ...props.selectedData,
    //         mining_group_name: props.selectedData.mining_group,
    //         age: props.selectedData.ages,
    //         token: props.selectedData.coin_token,
    //         showflag: props.selectedData.show_flag ? "show" : "hide"
    //     });
    // }, [props.selectedData])

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
                            <CButton color="secondary" className="ms-2" onClick={ handleClickWithdraw }>Withdraw</CButton>
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