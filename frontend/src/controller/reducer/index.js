import {combineReducers} from 'redux';
import assetReducer from './asset';
import userReducer from './user';
import uiReducer from './ui';

export default combineReducers({
    asset:assetReducer,
    user:userReducer,
    ui:uiReducer
})