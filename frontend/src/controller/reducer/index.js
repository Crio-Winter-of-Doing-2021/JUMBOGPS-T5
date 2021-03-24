import {combineReducers} from 'redux';
import assetsReducer from './assets';
import assetReducer from './asset';
import userReducer from './user';
import uiReducer from './ui';
import geoReducer from './geo';

export default combineReducers({
    assets:assetsReducer,
    asset:assetReducer,
    user:userReducer,
    ui:uiReducer,
    geo:geoReducer,
})