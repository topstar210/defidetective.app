import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CTable
} from '@coreui/react'
import { cilPlus, cibExpertsExchange, cilPen } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import moment from 'moment';

import { 
  getData, 
  saveData, 
  deleteRowById
} from "src/store/actions/tokens.actions"
import Modal from "./components/Modal"
import "./token.scss";

// table header
const columns = [
  { key: 'coin', label: 'COIN', _props: { scope: 'col' }, },
  { key: 'name', label: 'NAME', _props: { scope: 'col' }, },
  { key: 'website', label: 'WEBSITE', _props: { scope: 'col' }, },
  { key: 'kyc', label: 'DEFI BADGE', _props: { scope: 'col' }, },
  { key: 'presale_buy', label: 'PRESALE/BUY', _props: { scope: 'col' }, },
  { key: 'chart', label: 'CHART', _props: { scope: 'col' }, },
  { key: 'chain', label: 'CHAIN', _props: { scope: 'col' }, },
  { key: 'telegram', label: 'TELEGRAM', _props: { scope: 'col' }, },
  { key: 'discord', label: 'DISCORD', _props: { scope: 'col' }, },
  { key: 'twitter', label: 'TWITTER', _props: { scope: 'col' }, },
  { key: 'audit', label: 'AUDIT', _props: { scope: 'col' }, },
  { key: 'contract', label: 'CONTRACT', _props: { scope: 'col' }, },
  { key: 'launch', label: 'LAUNCH', _props: { scope: 'col' }, },
];
// table data
let appData = {};
let selectedData = {};

const Tokens = () => {
  const dispatch = useDispatch();
  const { loginState } = useSelector(state => state.sapp);
  const [mVisible, setMVisible] = useState(false); // modal visible state;

  // initial data  ---------------
  useEffect(() => { dispatch(getData()) }, []);
  const { tokenList } = useSelector(state => state.tokens);

  // if admin, add the actions
  useEffect(()=>{
    if(loginState === "success") {
      columns.push({
        key: "price",
        label: "DECIMALS",
        _props: { scope: 'col' }
      });
      columns.push({
        key: "action",
        label: "E / D",
        _props: { scope: 'col' }
      });
    } else {
      columns.push({
        key: "mcap",
        label: "MARKET CAP",
        _props: { scope: 'col' }
      });
      columns.push({
        key: "t_price",
        label: "PRICE",
        _props: { scope: 'col' }
      });
    }
  },[loginState])

  // handle click applybtn
  const handleClickApplyBtn = () => {
    if (loginState == "success") { // a user can open if logined
      setMVisible(!mVisible);
    } else {
      window.open("https://t.me/DefiSpammerAdmin", "_blank");
    }
  }

  // handle click actions(edit || delete)
  const handleClickActions = (rId, action)=>{
    if(action === "D"){
      if(!confirm("Do you delete this item?")) return true;
      dispatch(deleteRowById(rId));
    } else {
      selectedData = appData[rId]
      setMVisible(true);
    }
  }

  // making table rows
  const items = tokenList.map((val, ind) => {
    appData[val.id] = val;

    let splitbar = "";
    if (tokenList[ind + 1] && val.level !== tokenList[ind + 1].level) {
      splitbar = "split-row-" + val.level;
    }
    let item = {
      coin          : <div style={{ width: 50, height: 50 }}><img src={val.coin} alt="" /></div>,
      name          : val.name || " ",
      website       : <CLink
                      className="website_link"
                      target="_blank"
                      href={val.website}
                    ><span className="badge bg-success-gradient">{val.website && "website"}</span></CLink>,
      kyc           : <CLink
                      target="_blank"
                      href={val.kyc}
                    >
                        <span className="badge bg-success-gradient">{val.kyc && "defi badge"}</span>
                      </CLink>,
      presale_buy   : val.presale_buy || " ",
      chart         : <CLink
                      target="_blank"
                      href={val.chart}
                    >
                        <span className="badge bg-success-gradient">{val.chart && "chart"}</span>
                      </CLink>,
      chain         : val.chain || "  ",
      telegram      : <CLink
                      target="_blank"
                      href={val.telegram}
                    >
                      <span className="badge bg-success-gradient">{val.telegram && "telegram"}</span>
                    </CLink>,
      discord       : <CLink
                    target="_blank"
                    href={val.discord}
                    >
                      <span className="badge bg-success-gradient">{val.discord && "discord"}</span>
                    </CLink>,
      twitter       : <CLink
                        target="_blank"
                        href={val.twitter}
                      >
                        <span className="badge bg-success-gradient">{val.twitter && "twitter"}</span>
                      </CLink>,
      audit          : <CLink
                        target="_blank"
                        href={val.audit}
                      >
                        <span className="badge bg-success-gradient">{val.audit && "audit"}</span>
                      </CLink>,
      contract      : <CLink
                      target="_blank"
                      href={val.contract}
                    >
                      <span className="badge bg-success-gradient">{val.contract && "contract"}</span>
                    </CLink>,
      launch        : val.launch || " ",
      _props: {
        className: "level_" + val.level + " " + splitbar
      }
    }
    if(loginState === "success"){
      item['price'] = val.price || " ";
      item['action'] = <>
        <CIcon onClick={()=>handleClickActions(val.id, 'E')} icon={ cilPen } className="text-white" size="sm" /> | &nbsp;
        <CIcon onClick={()=>handleClickActions(val.id, 'D')} icon={ cibExpertsExchange } className="text-white" size="sm" />  
      </>
    } else {
      item['mcap'] = " mcap ";
      item['t_price'] = " price ";
    }
    return item;
  })

  return (
    <div className='tokens-page'>
      <CRow className='mt-3 px-lg-3'>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow className='phcols p-md-1 p-lg-2 pt-md-3 pt-lg-4'>
                <CCol md={12} lg={6} xl={4} className="d-flex justify-content-lg-end justify-content-center">
                  <div className="phcol title">
                    <div className="title1">LINKS</div>
                    <div>
                      <a href="https://t.me/defidetectiveapp" alt="owner telegram" target="_blank">Contact Us</a>
                    </div>
                    <div className="title1">FOLLOW US</div>
                    <div className="social">
                      <a target="_blank" href="https://t.me/defidetective" alt="telegram">
                        <img src="/images/telegram.png" alt="telegram" />
                      </a>
                      <a target="_blank" href="https://twitter.com/defidetectorapp" alt="twitter">
                        <img src="/images/twitter.svg" alt="telegram" />
                      </a>
                      <a target="_blank" href="https://discord.gg/tXBq6HkJMc" alt="discord">
                        <img src="/images/discord.png" alt="telegram" />
                      </a>
                      <a target="_blank" href="./defidetective.app.pdf" alt="whitepaper">
                        <img src="/images/doc.png" alt="telegram" />
                      </a>
                    </div>
                  </div>
                </CCol>
                <CCol md={12} lg={6} xl={4} className="d-flex justify-content-center">
                  <div className="phcol partnership" id="partnership">
                    <div className="sponsor">
                      <div className="content">
                        <a target="_blank" href="https://vampirekingdom.xyz/">
                          <img src="https://defidetective.app/uploads/16670425694F2B3DB3-32A4-41B5-9758-EFEDFCF5C2C7.gif" alt="BNBMiner-S" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CCol>
                <CCol md={12} lg={6} xl={4} className="d-flex justify-content-lg-start justify-content-center">
                  <div className="phcol partnership" id="partnership">
                    <div className="sponsor">
                      <div className="content">
                        <a target="_blank" href="https://vampirekingdom.xyz/">
                          <img src="https://defidetective.app/uploads/16670425694F2B3DB3-32A4-41B5-9758-EFEDFCF5C2C7.gif" alt="BNBMiner-S" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CButton className="apply-listing d-flex" onClick={() => handleClickApplyBtn()}>
                <CIcon icon={cilPlus} className="text-white" size="sm" /> APPLY LISTING
              </CButton>
              <CTable columns={columns} items={items} responsive />
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

export default Tokens
