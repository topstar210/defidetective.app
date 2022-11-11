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
    CCol,
    CFormSelect
} from '@coreui/react'

const Modal = (props) => {
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
                            id="website_url"
                            label="WEBSITE URL"
                            placeholder="ex: https://wealthmountain.app/binance"
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="website"
                            label="WEBSITE"
                            placeholder="ex: Wealth Mountain"
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="defi_badge"
                            label="DEFI BADGE"
                            placeholder="DEFI BADGE"
                        />
                    </CCol>
                    <CCol lg={3}>
                        <CFormInput
                            type="text"
                            id="logo"
                            label="LOGO"
                            placeholder=""
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="telegram"
                            label="TELEGRAM"
                            placeholder="https://t.me/WCMdineBUSD"
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="discord"
                            label="DISCORD"
                            placeholder="https://discord.gg/Pgj3XqFy4d"
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="twitter"
                            label="TWITTER"
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
                            placeholder="BUSD"
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="contract"
                            label="CONTRACT"
                            placeholder="https://bscscan.com/address/0xbcae54cdf6a1b1cd0ec3d44114b452179a96c1e3"
                        />
                    </CCol>
                    <CCol lg={4}>
                        <CFormInput
                            type="text"
                            id="audit"
                            label="AUDIT"
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
                            placeholder="ex: 10% / 2%"
                        />
                    </CCol>
                    <CCol ls={6}>
                        <CFormInput
                            type="date"
                            id="age"
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
                            placeholder="ex: 5%"
                        />
                    </CCol>
                    <CCol ls={6}>
                        <CFormInput
                            type="text"
                            id="tvl"
                            label="TVL"
                            disabled
                        />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CCol ls={6}>
                        <div class="form-group">
                            <label htmlFor="level">LEVEL</label>
                            <select id="level" class="form-control">
                                <option value={1} selected="">1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                        </div>
                    </CCol>
                    <CCol ls={6}>
                        <div class="form-group">
                            <label htmlFor="level">SHOW/HIDE</label>
                            <select id="level" class="form-control">
                                <option value={0} selected="">SHOW</option>
                                <option value={1}>HIDE</option>
                            </select>
                        </div>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="success">SAVE</CButton>
                <CButton color="secondary" onClick={() => props.setMVisible(false)}>
                    CLOSE
                </CButton>
            </CModalFooter>
        </CModal>
    )
}
export default Modal;