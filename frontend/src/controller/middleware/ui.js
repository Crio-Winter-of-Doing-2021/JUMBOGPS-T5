import { loadAssets } from "../reducer/assets";
import { pageLoaded } from "../reducer/ui";

const pageLoadedFlow = ()=> ({ dispatch }) => next => action => {
    next(action);
    if (action.type === pageLoaded.type) {
        dispatch(loadAssets());
    }
}
const uiFlows = [
  pageLoadedFlow
]
export default uiFlows; 