import {
  loadAsset,
  loadAssetSuccess,
  setAssetInfo,
  setDateRange,
  setGeoJSON,
} from "../reducer/asset";
import * as uiActions from "../reducer/ui";
import moment from "moment";
import { loadGeoFence, loadGeoRoute, loadNotifications } from "../reducer/geo";


function arrayToGeoJSON(track) {
  const ts = track[0].timestamp;
  const features = track.map((item) => ({
    type: "Feature",
    geometry: { type: "Point", coordinates: [item.lon,item.lat] },
    properties:{
      lastUpdated:moment.duration(moment(item.timestamp).diff(ts)).asDays()
    }
  }));
  return {
    type: "FeatureCollection",
    features: features,
  };
}

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
      console.log(response.data);
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

const setAssetInfoFlow = ({}) => ({ dispatch }) => (next) => async (action) => {
  next(action);
  if (action.type === setAssetInfo.type) {
    dispatch(uiActions.setTabId("2"));
  }
};

const setDateRangeFlow = ({ getAssetTrackByTime }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
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
      console.log(response.data);
      dispatch(loadAssetSuccess(response.data));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

const assetFlow = [
  trackAssetFlow,
  setAssetInfoFlow,
  setDateRangeFlow,
];

export default assetFlow;
