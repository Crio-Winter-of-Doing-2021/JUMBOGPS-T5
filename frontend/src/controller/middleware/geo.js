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
const putGeoFenceFlow = ({ putGeoFence }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  if (action.type === updateGeoFence.type) {
    try {
      const response = await putGeoFence(
        getState().user.token,
        getState().asset.assetInfo.id,
        getState().geo.geoFence
      );

      const message =
        "Geo Fence Updated for Asset " + getState().asset.assetInfo.name;
      dispatch(uiActions.setSuccessToast(message));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
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
const putGeoRouteFlow = ({ putGeoRoute }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  if (action.type === updateGeoRoute.type) {
    try {
      const response = await putGeoRoute(
        getState().user.token,
        getState().asset.assetInfo.id,
        getState().geo.geoRoute
      );

      const message =
        "Geo Route Updated for Asset " + getState().asset.assetInfo.name;
      dispatch(uiActions.setSuccessToast(message));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
  }
};

/**
 * Asset Notifications Middleware
 * @description
 * Make API Call to get notification list for selected asset
 * Dispatches loadNotificationsSuccess(response.data) on success
 * Dispatches setError(err) on failure.
 * @param {function} services.getGeoFence get asset geofence api
 */
const geoAssetNotificationsFlow = ({ getAssetNotifications }) => ({
  dispatch,
  getState,
}) => (next) => async (action) => {
  next(action);
  if (action.type === loadAssetNotifications.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await getAssetNotifications(
        getState().user.token,
        getState().asset.assetInfo.id
      );
      const notifications = response.data.data;
      dispatch(
        uiActions.setUnseenAssetNotifications(
          calcUnseen(notifications, getState().user.email)
        )
      );
      dispatch(loadAssetNotificationsSuccess(notifications));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

const calcUnseen = (notifications, email) => {
  let unseenNotifications = [];
  notifications.forEach((notification) => {
    notification.unseen = !notification.seenBy.includes(email);
    if (notification.unseen) {
      unseenNotifications.push({
        id: notification._id,
        assetId: notification.assetId,
      });
    }
  });
  return unseenNotifications;
};

/**
 * Notifications Middleware
 * @description
 * Make API Call to get notification list for selected asset
 * Dispatches loadNotificationsSuccess(response.data) on success
 * Dispatches setError(err) on failure.
 * @param {function} services.getGeoFence get asset geofence api
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
        uiActions.setUnseenNotifications(
          calcUnseen(notifications, getState().user.email)
        )
      );
      dispatch(loadNotificationsSuccess(notifications));
    } catch (error) {
      // dispatch(uiActions.setError(error));
      logger(error);
    }
  }
};

/**
 * Single Notification Middleware
 * @description
 * Make API Call to get notification list for selected asset
 * Dispatches loadNotificationsSuccess(response.data) on success
 * Dispatches setError(err) on failure.
 * @param {function} services.getGeoFence get asset geofence api
 */
const addNotificationFlow = () => ({ dispatch, getState }) => (next) => (
  action
) => {
  next(action);
  if (action.type === addNotification.type) {
    try {
      const notification = action.payload;
      // notification.unseen = true;
      dispatch(
        uiActions.addUnseenNotifications({
          id: notification._id,
          assetId: notification.assetId,
        })
      );
      // dispatch(
      //   loadNotificationsSuccess([
      //     notification,
      //     ...getState().geo.notifications,
      //   ])
      // );
    } catch (error) {
      // dispatch(uiActions.setError(error));
    }
  }
};

/**
 * Single Notification Middleware
 * @description
 * Make API Call to get notification list for selected asset
 * Dispatches loadNotificationsSuccess(response.data) on success
 * Dispatches setError(err) on failure.
 * @param {function} services.getGeoFence get asset geofence api
 */
const addAssetNotificationFlow = () => ({ dispatch, getState }) => (next) => (
  action
) => {
  next(action);
  if (action.type === addAssetNotification.type) {
    try {
      const notification = action.payload;
      // notification.unseen = true;
      logger(getState().ui.unseenAssetNotifications);
      dispatch(
        uiActions.addUnseenAssetNotifications({
          id: notification._id,
          assetId: notification.assetId,
        })
      );
      // dispatch(
      //   loadAssetNotificationsSuccess([
      //     notification,
      //     ...getState().geo.notifications,
      //   ])
      // );
      logger(action.payload);
    } catch (error) {
      // dispatch(uiActions.setError(error));
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
