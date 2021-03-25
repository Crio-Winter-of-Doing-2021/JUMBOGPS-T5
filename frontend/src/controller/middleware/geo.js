import {
  loadGeoFence,
  loadGeoFenceSuccess,
  loadGeoRoute,
  loadGeoRouteSuccess,
  loadNotifications,
  loadNotificationsSuccess,
  updateGeoRoute,
  updateGeoFence,
} from "../reducer/geo";
import * as uiActions from "../reducer/ui";

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
      console.log(response.data);
      dispatch(loadGeoFenceSuccess(response.data));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

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
      console.log(response.data);
      dispatch(loadGeoRouteSuccess(response.data));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

const putGeoFenceFlow = ({ putGeoFence }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  // console.log("put", getState().geo.geoFence);
  if (action.type === updateGeoFence.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await putGeoFence(
        getState().user.token,
        getState().asset.assetInfo.id,
        getState().geo.geoFence
      );
      console.log(response.data);
      // dispatch(putGeoFenceFlow(response.data));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

const putGeoRouteFlow = ({ putGeoRoute }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  if (action.type === updateGeoRoute.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await putGeoRoute(
        getState().user.token,
        getState().asset.assetInfo.id,
        getState().geo.geoRoute
      );
      console.log(response.data);
      // dispatch(putGeoFenceFlow(response.data));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

const geoNotificationsFlow = ({ getNotifications }) => ({
  dispatch,
  getState,
}) => (next) => async (action) => {
  next(action);
  if (action.type === loadNotifications.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await getNotifications(
        getState().user.token,
        getState().asset.assetInfo.id
      );
      console.log(response.data);
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
  geoNotificationsFlow,
];

export default assetFlow;
