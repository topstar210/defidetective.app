import { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";


const Modal = (props) => {
    const dispatch = useDispatch();
    const [tokenState, setTokenState] = useState({});

    const handleChange = (e) => {
        setTokenState({ ...tokenState, [e.target.id]: e.target.value })
    }

    const handleClickSubmit = async() => {
        await dispatch(props.saveAppInfo(tokenState));
        props.setMVisible(false)

    }

    useEffect(() => {
        setTokenState({
            ...props.selectedData,
            mining_group_name: props.selectedData.mining_group,
            age: props.selectedData.ages,
            token: props.selectedData.coin_token,
            showflag: props.selectedData.show_flag ? "show" : "hide"
        });
    }, [props.selectedData])

    return (
        <CModal size="lg" visible={props.visible} onClose={() => props.setMVisible(false)}>
            <CModalHeader>
                <CModalTitle>Add ROI DAPP</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="mb-3">
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="coin"
                            label="COIN"
                            value={tokenState.coin || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="name"
                            label="NAME"
                            value={tokenState.name || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="logo_url"
                            label="LOGO"
                            value={tokenState.logo_url || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder=""
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="defi_badge"
                            label="DEFI BADGE"
                            value={tokenState.defi_badge || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="DEFI BADGE"
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="tg_group"
                            label="TELEGRAM"
                            value={tokenState.tg_group || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://t.me/WCMdineBUSD"
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="discode_link"
                            label="DISCORD"
                            value={tokenState.discode_link || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://discord.gg/Pgj3XqFy4d"
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="twitter_link"
                            label="TWITTER"
                            value={tokenState.twitter_link || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://twitter.com/WolfdOfCrypto885"
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="token"
                            label="TOKEN"
                            value={tokenState.token || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="BUSD"
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="contract"
                            label="CONTRACT"
                            value={tokenState.contract || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://bscscan.com/address/0xbcae54cdf6a1b1cd0ec3d44114b452179a96c1e3"
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="audit"
                            label="AUDIT"
                            value={tokenState.audit || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="https://georgestamp.xyz/2022/09/wc-miner/"
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol ls={6}>
                        <CFormInput
                            type="text"
                            id="fees"
                            label="FEES"
                            value={tokenState.fees || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="ex: 10% / 2%"
                        />
                    </CCol>
                    <CCol ls={6}>
                        <CFormInput
                            type="date"
                            id="age"
                            value={tokenState.age || ""}
                            onChange={(e) => handleChange(e)}
                            label="AGE(LAUNCH DATE)"
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol ls={6}>
                        <CFormInput
                            type="text"
                            id="daily"
                            label="DAILY%"
                            value={tokenState.daily || ""}
                            onChange={(e) => handleChange(e)}
                            placeholder="ex: 5%"
                        />
                    </CCol>
                    <CCol ls={6}>
                        <CFormInput
                            type="text"
                            id="tvl"
                            label="TVL"
                            value={tokenState.tvl || ""}
                            onChange={(e) => handleChange(e)}
                            disabled
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol ls={6}>
                        <div className="form-group">
                            <label htmlFor="level">LEVEL</label>
                            <select
                                id="level"
                                value={tokenState.level || ""}
                                onChange={(e) => handleChange(e)}
                                className="form-control">
                                <option value={0}></option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                        </div>
                    </CCol>
                    <CCol ls={6}>
                        <div className="form-group">
                            <label htmlFor="showflag">SHOW/HIDE</label>
                            <select
                                id="showflag"
                                value={tokenState.showflag}
                                onChange={(e) => handleChange(e)}
                                className="form-control">
                                <option value=""></option>
                                <option value="show">SHOW</option>
                                <option value="hide">HIDE</option>
                            </select>
                        </div>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => handleClickSubmit()}>SAVE</CButton>
                <CButton color="secondary" onClick={() => props.setMVisible(false)}>
                    CLOSE
                </CButton>
            </CModalFooter>
        </CModal>
    )
}
export default Modal;