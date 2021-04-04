import logger from "../../utils/logger";
import { loadAssets } from "../reducer/assets";
import {
  loadAssetNotifications,
  loadAssetNotificationsSuccess,
  loadNotifications,
  loadNotificationsSuccess,
} from "../reducer/geo";
import {
  markSeenAssetNotifications,
  markSeenNotifications,
  setUnseenAssetNotificationsCount,
  setUnseenNotificationsCount,
} from "../reducer/ui";
import { hideSidenav, pageLoaded, toggleSidenav } from "../reducer/ui";

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
    dispatch(loadNotifications());
  }
};
/**
 * Hide SIdenav Middleware
 * @description
 * Hide sidenav
 */
const hideSideNavFlow = () => ({ dispatch, getState }) => (next) => (
  action
) => {
  next(action);
  if (action.type === hideSidenav.type) {
    if (getState().ui.deviceSize === "sm") {
      if (getState().ui.showSideNav) {
        dispatch(toggleSidenav());
      }
    }
  }
};

const markSeenNotificationsFlow = () => ({ dispatch, getState }) => (next) => (
  action
) => {
  next(action);
  if (action.type === markSeenNotifications.type) {
    try {
      dispatch(loadNotificationsSuccess(action.payload));
      dispatch(setUnseenNotificationsCount(0));
      if (getState().asset.assetInfo.id) dispatch(loadAssetNotifications());
    } catch (error) {
      logger(error);
    }
  }
};

const markSeenAssetNotificationsFlow = () => ({ dispatch, getState }) => (
  next
) => (action) => {
  next(action);
  if (action.type === markSeenAssetNotifications.type) {
    try {
      dispatch(loadAssetNotificationsSuccess(action.payload));
      dispatch(setUnseenAssetNotificationsCount(0));
      dispatch(loadNotifications());
    } catch (error) {
      logger(error);
    }
  }
};

const uiFlows = [
  pageLoadedFlow,
  hideSideNavFlow,
  markSeenNotificationsFlow,
  markSeenAssetNotificationsFlow,
];
export default uiFlows;
