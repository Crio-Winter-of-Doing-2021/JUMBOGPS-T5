import {combineReducers} from 'redux';
import todosReducer from './todos';
import uiReducer from './ui';

export default combineReducers({
    todos:todosReducer,
    ui:uiReducer
})