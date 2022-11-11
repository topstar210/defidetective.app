import { 
    GET_DAPPS 
} from "../types/dapps.types";

const initialState = {
    dappList: [],
  }

export function dappState(state = initialState, action) 
{
    switch (action.type) {
        case GET_DAPPS:
            return {
                ...state, 
                dappList: [ ...action.payload ] 
            }
        default:
            return { ...state };
    }
}
