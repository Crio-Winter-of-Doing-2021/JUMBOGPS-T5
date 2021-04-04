import moment from "moment";
import logger from "../../utils/logger";
import {
  loadAsset,
  loadAssetSuccess,
  setDateRange,
  setGeoJSON,
} from "../reducer/asset";
import {
  loadAssetNotifications,
  loadGeoFenceSuccess,
  loadGeoRouteSuccess,
} from "../reducer/geo";
import * as uiActions from "../reducer/ui";

function arrayToGeoJSON(track) {
  const ts = (track.length===0) ? 'invalid' : track[0].timestamp;
  const features = track.map((item) => ({
    type: "Feature",
    geometry: { type: "Point", coordinates: [item.lon, item.lat] },
    properties: {
      lastUpdated: moment.duration(moment(item.timestamp).diff(ts)).asDays(),
    },
  }));
  return {
    type: "FeatureCollection",
    features: features,
  };
}

/**
 * Track Asset  Middleware
 * @description
 * Make API Call to get all locations for a particular Asset. Performs converting to GeoJSON operation.
 * Dispatches loadAssetSuccess(response.data) ,setGeoJSON(geoJSON),
 * loadNotifications(), loadGeoFence(), loadGeoRoute() on success.
 * Dispatches setError(err) on failure.
 * @param {function} services.getAssetTrack get asset api
 */
const trackAssetFlow = ({ getAssetTrack }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  if (action.type === loadAsset.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await getAssetTrack(
        getState().user.token,
        action.payload.id
      );
      logger(response, action.payload);
      if(!action.payload.mounted) return;
      dispatch(loadAssetSuccess(response.data));
      const geoJSON = arrayToGeoJSON(response.data.data.track);
      dispatch(setGeoJSON(geoJSON));
      dispatch(loadAssetNotifications());
      dispatch(loadGeoFenceSuccess(response.data.data.geofence));
      dispatch(loadGeoRouteSuccess(response.data.data.georoute));
    } catch (error) {
      if (error.response) {
        dispatch(uiActions.setError(error.response.data.error.message));
      } else {
        dispatch(uiActions.setError(error.message));
      }
    }
    dispatch(uiActions.setLoading(false));
  }
};


/**
 * Track Asset Within Date Range Middleware
 * @description
 * Make API Call to get all locations for a particular Asset within given Date Range.
 * Performs converting to GeoJSON operation.
 * Dispatches loadAssetSuccess(response.data) ,setGeoJSON(geoJSON)
 * Dispatches setError(err) on failure.
 * @param {function} services.getAssetTrackByTime get asset api by time
 */
const setDateRangeFlow = ({ getAssetTrackByTime }) => ({
  dispatch,
  getState,
}) => (next) => async (action) => {
  next(action);
  if (action.type === setDateRange.type) {
    dispatch(uiActions.setLoading(true));
    try {
      logger(action.payload);
      const response = await getAssetTrackByTime(
        getState().user.token,
        getState().asset.assetInfo.id,
        action.payload
      );

      dispatch(loadAssetSuccess(response.data));
      const geoJSON = arrayToGeoJSON(response.data.data.track);
      dispatch(setGeoJSON(geoJSON));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

const assetFlow = [trackAssetFlow, setDateRangeFlow];

export default assetFlow;
