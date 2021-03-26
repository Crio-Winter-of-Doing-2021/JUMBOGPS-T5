import { combineReducers } from "redux";
import assetReducer from "./asset";
import assetsReducer from "./assets";
import geoReducer from "./geo";
import uiReducer from "./ui";
import userReducer from "./user";

export default combineReducers({
  assets: assetsReducer,
  asset: assetReducer,
  user: userReducer,
  ui: uiReducer,
  geo: geoReducer,
});
