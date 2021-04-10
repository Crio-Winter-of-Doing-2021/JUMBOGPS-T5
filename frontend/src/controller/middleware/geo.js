import logger from "../../utils/logger";
import {
  addAssetNotification,
  addNotification,
  loadAssetNotifications,
  loadAssetNotificationsSuccess,
  loadGeoFence,
  loadGeoFenceSuccess,
  loadGeoRoute,
  loadGeoRouteSuccess,
  loadNotifications,
  loadNotificationsSuccess,
  updateGeoFence,
  updateGeoRoute,
} from "../reducer/geo";
import * as uiActions from "../reducer/ui";

/**
 * Geo Fence Middleware
 * @description
 * Make API Call to get geofence object for selected asset
 * Dispatches loadGeoFenceSuccess(response.data) on success
 * Dispatches setError(err) on failure.
 * @param {function} services.getGeoFence get asset geofence api
 */
const geoFenceFlow = ({ getGeoFence }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  if (action.type === loadGeoFence.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await getGeoFence(
        getState().user.token,
        getState().asset.assetInfo.id
      );

      dispatch(loadGeoFenceSuccess(response.data));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

/**
 * Geo Route Middleware
 * @description
 * Make API Call to get georoute object for selected asset
 * Dispatches loadGeoRouteSuccess(response.data) on success
 * Dispatches setError(err) on failure.
 * @param {function} services.getGeoRoute get asset georoute api
 */
const geoRouteFlow = ({ getGeoRoute }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  if (action.type === loadGeoRoute.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await getGeoRoute(
        getState().user.token,
        getState().asset.assetInfo.id
      );

      dispatch(loadGeoRouteSuccess(response.data));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

/**
 * Updated Geo Fence Middleware
 * @description
 * Make API Call to put geofence object for selected asset
 * Dispatches setSuccessToast(message) on success
 * Dispatches setError(err) on failure.
 * @param {function} services.putGeoFence put asset geofence api
 */
const putGeoFenceFlow = ({ putGeoFence, deleteGeoFence }) => ({
  dispatch,
  getState,
}) => (next) => async (action) => {
  next(action);
  if (action.type === updateGeoFence.type) {
    dispatch(uiActions.setSpinner("geo"));
    try {
      let message;
      if (getState().geo.geoFence == null) {
        await deleteGeoFence(
          getState().user.token,
          getState().asset.assetInfo.id
        );
        message =
          "Geo Fence Deleted for Asset " + getState().asset.assetInfo.name;
      } else {
        await putGeoFence(
          getState().user.token,
          getState().asset.assetInfo.id,
          getState().geo.geoFence
        );
        message =
          "Geo Fence Updated for Asset " + getState().asset.assetInfo.name;
      }

      dispatch(uiActions.setSuccessToast(message));
    } catch (error) {
      if (error.response) {
        dispatch(uiActions.setError(error.response.data.error.message));
      } else {
        dispatch(uiActions.setError(error.message));
      }
    }
    dispatch(uiActions.setSpinner(""));
  }
};

/**
 * Updated Geo Route Middleware
 * @description
 * Make API Call to put georoute object for selected asset
 * Dispatches setSuccessToast(message)  on success
 * Dispatches setError(err) on failure.
 * @param {function} services.putGeoRoute put asset georoute api
 */
const putGeoRouteFlow = ({ putGeoRoute,deleteGeoRoute }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  if (action.type === updateGeoRoute.type) {
    dispatch(uiActions.setSpinner("geo"));
    try {
      let message;
      if (getState().geo.geoRoute == null) {
        await deleteGeoRoute(
          getState().user.token,
          getState().asset.assetInfo.id
        );
        message =
          "Geo Fence Deleted for Asset " + getState().asset.assetInfo.name;
      } else {
        await putGeoRoute(
          getState().user.token,
          getState().asset.assetInfo.id,
          getState().geo.geoRoute
        );
        message =
          "Geo Route Updated for Asset " + getState().asset.assetInfo.name;
      }
      dispatch(uiActions.setSuccessToast(message));
    } catch (error) {
      if (error.response) {
        dispatch(uiActions.setError(error.response.data.error.message));
      } else {
        dispatch(uiActions.setError(error.message));
      }
    }
    dispatch(uiActions.setSpinner(""));
  }
};

/**
 * Notifications Middleware
 * @description
 * Make API Call to get notification list for all assets
 * Dispatches loadNotificationsSuccess(response.data) on success
 * Dispatches setError(err) on failure.
 * @param {function} services.getNotifications get notifications api
 */
const geoNotificationsFlow = ({ getNotifications }) => ({
  dispatch,
  getState,
}) => (next) => async (action) => {
  next(action);
  if (action.type === loadNotifications.type) {
    try {
      const response = await getNotifications(getState().user.token);
      const notifications = response.data.data;
      logger(notifications);
      dispatch(
        uiActions.setUnseenNotificationsCount(
          notifications.filter((notification) => !notification.seen).length
        )
      );
      dispatch(loadNotificationsSuccess(notifications));
    } catch (error) {
      logger(error);
    }
  }
};

/**
 * Asset Notifications Middleware
 * @description
 * Make API Call to get notification list for selected asset
 * Dispatches loadAssetNotificationsSuccess(response.data) on success
 * Dispatches setError(err) on failure.
 * @param {function} services.getAssetNotifications get asset notifications api
 */
const geoAssetNotificationsFlow = ({ getAssetNotifications }) => ({
  dispatch,
  getState,
}) => (next) => async (action) => {
  next(action);
  if (action.type === loadAssetNotifications.type) {
    try {
      const response = await getAssetNotifications(
        getState().user.token,
        getState().asset.assetInfo.id
      );
      const notifications = response.data.data;
      dispatch(
        uiActions.setUnseenAssetNotificationsCount(
          notifications.filter((notification) => !notification.seen).length
        )
      );
      dispatch(loadAssetNotificationsSuccess(notifications));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
  }
};

/**
 * Add = Notification Middleware
 * @description
 * Triggered on receiving new notification belonging and
 * add to unseen  notifications
 * Dispatches addUnseenNotifications(response.data)
 */
const addNotificationFlow = () => ({ dispatch, getState }) => (next) => (
  action
) => {
  next(action);
  if (action.type === addNotification.type) {
    try {
      if (getState().asset.assetInfo.id === action.payload.assetId) {
        dispatch(addAssetNotification(action.payload));
      }
      dispatch(uiActions.addUnseenNotifications());
    } catch (error) {
      logger(error);
    }
  }
};

/**
 * Add Asset Notification Middleware
 * @description
 * Triggered on receiving new notification belonging to selected assset and
 * add to unseen asset notifications
 * Dispatches addUnseenAssetNotifications(response.data)
 */
const addAssetNotificationFlow = () => ({ dispatch, getState }) => (next) => (
  action
) => {
  next(action);
  if (action.type === addAssetNotification.type) {
    try {
      dispatch(uiActions.addUnseenAssetNotifications());
    } catch (error) {
      logger(error);
    }
  }
};

const assetFlow = [
  geoFenceFlow,
  geoRouteFlow,
  putGeoFenceFlow,
  putGeoRouteFlow,
  geoAssetNotificationsFlow,
  geoNotificationsFlow,
  addNotificationFlow,
  addAssetNotificationFlow,
];

export default assetFlow;
