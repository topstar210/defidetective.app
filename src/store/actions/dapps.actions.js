import { 
    GET_DAPPS,
    SAVE_DAPP
} from "../types/dapps.types";

import myaxios from "src/provider/API"

export const getDppList  = () => dispatch =>
{
    myaxios.dapps.getList().then((res)=>{
        dispatch({
            type: GET_DAPPS,
            payload: res.data
        })
    })
}

export const calcTVL = () => {
    return '$316,084.76';
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