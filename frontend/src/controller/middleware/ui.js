import { loadAssets } from "../reducer/assets";
import { pageLoaded } from "../reducer/ui";

/**
* Page Load Middleware
* @description
* Load Dashboard when user lands on Home Page
* Dispatches loadAssets() 
*/
const pageLoadedFlow = () => ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === pageLoaded.type) {
    dispatch(loadAssets());
  }
};
const uiFlows = [pageLoadedFlow];
export default uiFlows;
