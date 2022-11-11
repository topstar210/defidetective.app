import { combineReducers } from "redux";
import { appState } from "./app.reducers";
import { dappState } from "./dapps.reducers";

const reducers = combineReducers({
    sapp: appState,
    dapps: dappState
})

export default reducers;
