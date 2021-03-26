import moment from "moment";
import {
  loadAsset,
  loadAssetSuccess,
  setAssetInfo,
  setDateRange,
  setGeoJSON,
} from "../reducer/asset";
import { loadGeoFence, loadGeoRoute, loadNotifications } from "../reducer/geo";
import * as uiActions from "../reducer/ui";

function arrayToGeoJSON(track) {
  const ts = track[0].timestamp;
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
        getState().asset.assetInfo.id
      );
      
      dispatch(loadAssetSuccess(response.data));
      const geoJSON = arrayToGeoJSON(response.data.data.track);
      dispatch(setGeoJSON(geoJSON));
      dispatch(loadNotifications());
      dispatch(loadGeoFence());
      dispatch(loadGeoRoute());
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

/**
* Set Asset Info Middleware
* @description
* If an asset is selected for track, user is navigated to track component
* Dispatches setTabId("2")
*/
const setAssetInfoFlow = ({}) => ({ dispatch }) => (next) => async (action) => {
  next(action);
  if (action.type === setAssetInfo.type) {
    dispatch(uiActions.setTabId("2"));
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
      console.log(action.payload);
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

const assetFlow = [trackAssetFlow, setAssetInfoFlow, setDateRangeFlow];

export default assetFlow;
