import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CLink,
    CRow,
    CTable
} from '@coreui/react'
import { cibExpertsExchange, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import {
    getData,
    saveData,
    deleteRowById
} from "src/store/actions/advertise.actions"
import Modal from "./components/Modal"
import "./ads_ROI.scss";

let appData = {};
let selectedData = {};

const Ads_ROI = () => {
    const dispatch = useDispatch();
    const { loginState } = useSelector(state => state.sapp);
    const [mVisible, setMVisible] = useState(false); // modal visible state;

    // initial data  ---------------
    useEffect(() => { dispatch(getData()) }, []);
    const { advertises } = useSelector(state => state.adss);

    // handle click actions(edit || delete)
    const handleClickActions = (rId) => {
        if (!confirm("Do you delete this item?")) return true;
        dispatch(deleteRowById(rId));
    }

    const handleClickApplyBtn = () => {
        if (loginState == "success") { // a user can open if logined
            setMVisible(!mVisible);
        }
    }

    // making table rows
    const items = advertises.map((val, ind) => {
        appData[val.id] = val;
        let img_url = val.image ? process.env.REACT_APP_API_ENDPOINT_URI + "/../uploads/" + val.image : val.link;
        let item = {
            ads_img: <img src={img_url} className="my-3" alt="" />,
            level: `level ${val.level}`
        }
        if (loginState === "success") {
            item['action'] = <>
                <CIcon onClick={() => handleClickActions(val.id)} icon={cibExpertsExchange} className="text-white" size="sm" />
            </>
        }
        return item;
    })

    return (
        <div className='advertise-page'>
            <CRow className='mt-3 px-lg-3'>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardBody>
                            {
                                loginState == "success" &&
                                <CButton className="apply-listing d-flex px-5" onClick={() => handleClickApplyBtn()}>
                                    <CIcon icon={cilPlus} className="text-white" size="sm" /> APPLY
                                </CButton>
                            }
                            <CTable items={items} responsive />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <Modal
                visible={mVisible}
                setMVisible={setMVisible}
                saveData={saveData}
                selectedData={selectedData}
            />
        </div>
    )
}

export default Ads_ROI
