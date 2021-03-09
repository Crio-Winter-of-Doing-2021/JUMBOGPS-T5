import { pageLoaded } from "../reducer/ui";
import {loadTodos } from "../reducer/todos";

const pageLoadedFlow = ()=> ({ dispatch }) => next => action => {
    next(action);
    if (action.type === pageLoaded.type) {
        dispatch(loadTodos());
    }
}
const uiFlows = [
  pageLoadedFlow
]
export default uiFlows; 