import {
  loadAssets,
  loadAssetsSuccess,
  loadAssetsFailure,
  loadAsset,
  loadAssetSuccess,
  setAssetInfo,
  setDateRange,
} from "../reducer/asset";
import * as uiActions from "../reducer/ui";

const loadAssetsFlow = ({ getAssetList }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  if (action.type === loadAssets.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await getAssetList(
        getState().user.token,
        getState().asset.assetType
      );
      console.log(response.data);
      dispatch(loadAssetsSuccess(response.data));
    } catch (error) {
      dispatch(loadAssetsFailure(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

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
  loadAssetsFlow,
  trackAssetFlow,
  setAssetInfoFlow,
  setDateRangeFlow,
];

export default assetFlow;
