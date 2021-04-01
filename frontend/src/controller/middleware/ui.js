import { loadAssets } from "../reducer/assets";
import { hideSidenav, log, pageLoaded, toggleSidenav } from "../reducer/ui";

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
/**
* Hide SIdenav Middleware
* @description
* Hide sidenav
*/
const hideSideNavFlow = () => ({ dispatch,getState }) => (next) => (action) => {
  next(action);
  if (action.type === hideSidenav.type  ) {
    if(getState().ui.deviceSize==="sm"){
      if(getState().ui.showSideNav){
        dispatch(toggleSidenav());
      }
    }
  }
};
const uiFlows = [pageLoadedFlow,hideSideNavFlow];
export default uiFlows;
