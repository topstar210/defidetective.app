import { 
    GET_DAPPS
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
