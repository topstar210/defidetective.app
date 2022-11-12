import { combineReducers } from "redux";
import { appState } from "./app.reducers";
import { dappState } from "./dapps.reducers";
import { tokenState } from "./tokens.reducers";
import { influencerState } from "./influencer.reducers";

const reducers = combineReducers({
    sapp: appState,
    dapps: dappState,
    tokens: tokenState,
    influencers: influencerState
})

export default reducers;
