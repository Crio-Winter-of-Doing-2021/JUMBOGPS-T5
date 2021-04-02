import {
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
      
      dispatch(loadAssetNotificationsSuccess(response.data));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
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
    dispatch(uiActions.setLoading(true));
    try {
      const response = await getNotifications(
        getState().user.token
      );
      dispatch(loadNotificationsSuccess(response.data));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

const assetFlow = [
  geoFenceFlow,
  geoRouteFlow,
  putGeoFenceFlow,
  putGeoRouteFlow,
  geoAssetNotificationsFlow,
  geoNotificationsFlow,
];

export default assetFlow;
