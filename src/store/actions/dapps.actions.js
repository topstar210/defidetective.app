import { 
    GET_DAPPS,
    SAVE_DAPP
} from "../types/dapps.types";

import myaxios from "src/provider/API"
// import Web3 from 'web3';
import axios from 'axios';
import { config } from "../../config";
import { redirect } from "react-router-dom";

export const getDppList  = () => dispatch =>
{
    myaxios.dapps.getList().then((res)=>{
        dispatch({
            type: GET_DAPPS,
            payload: res.data
        })
    })
}

export const calcTVL = async (chainId, tokenPrice, contractAddress, tokenKind) => {
    if (contractAddress == null) return 0;
    contractAddress = contractAddress.slice(contractAddress.length-42);
    let res, balance;
    if (chainId == 'bsc') {
        if (tokenKind.toLowerCase() == 'bnb') {
            try {
                res = await axios.get(`https://api.bscscan.com/api?module=account&action=balance&address=${contractAddress}&tag=latest&apikey=${config.BSC_API_KEY}`);
                balance =  res.data.result / Math.pow(10, 18);
                return balance * tokenPrice;
            } catch {
                return 0;
            }
        } else if (tokenKind.toLowerCase() == 'busd') {
            try {
                res = await axios.get(`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&address=${contractAddress}&tag=latest&apikey=${config.BSC_API_KEY}`);
                return res.data.result / Math.pow(10, 18);
            } catch {
                return 0;
            }
        } else if (tokenKind.toLowerCase() == 'usdt') {
            try {
                res = await axios.get(`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x55d398326f99059fF775485246999027B3197955&address=${contractAddress}&tag=latest&apikey=YGKJFMK5FW1H9T9GR9VTGIT2UC5PXUTDTB`);
                return res.data.result / Math.pow(10, 18);
            } catch {
                return 0;
            }
        } else {
            return 0;
        }
    } else if (chainId == 'polygon') {
        if (tokenKind.toLowerCase() == 'matic') {
            try {
                res = await axios.get(`https://api.polygonscan.com/api?module=account&action=balance&address=${contractAddress}&tag=latest&apikey=${config.POLYGON_API_KEY}`);
                balance = res.data.result / Math.pow(10, 18);
                console.log("xxxxxxxxxx=> ", tokenPrice, balance, balance * tokenPrice);
                return balance * tokenPrice;
            } catch {
                return 0;
            }
        } else if (tokenKind.toLowerCase() == 'usdt') {
            try {
                res = await axios.get(`https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&address=${contractAddress}&tag=latest&apikey=${config.POLYGON_API_KEY}`);
                return res.data.result / Math.pow(10, 6);
            } catch {
                return 0;
            }
        } else {
            return 0;
        }
    } else if (chainId == 'avax') {
        if (tokenKind.toLowerCase() == 'avax') {
            try {
                res = await axios.get(`https://api.snowtrace.io/api?module=account&action=balance&address=${contractAddress}&tag=latest&apikey=ZVI4N9MEVBXDANDD4NPSXQI2NZEC9SYESU`);
                balance = res.data.result / Math.pow(10, 18);
                return balance * tokenPrice;
            } catch {
                return 0;
            }
        } else if (tokenKind.toLowerCase() == 'usdt') {
        
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

export const saveAppInfo = (data) => dispatch => {
    myaxios.dapps.saveAppInfo(data).then((res)=>{
        dispatch({
            type: SAVE_DAPP,
            payload: res.data
        })
    });
}

export const deleteRowById = (rId) => dispatch => {
    myaxios.dapps.deleteRowById(rId).then((res)=>{
        dispatch({
            type: SAVE_DAPP,
            payload: res.data
        })
    })
}

export const selectRowById = (rId) => dispatch => {
    
}