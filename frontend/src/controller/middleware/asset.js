import {
  loadAssets,
  loadAssetsSuccess,
  loadAssetsFailure,
  loadAsset,
  loadAssetSuccess,
  loadAssetFailure,
} from "../reducer/asset";
import * as uiActions from "../reducer/ui";

const loadAssetsFlow = ({ getAssetList }) => ({ dispatch,getState }) => (next) => async (
  action
) => {
  next(action);
  if (action.type === loadAssets.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await getAssetList(getState().asset.token);
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
      const response = await getAssetTrack(getState().asset.token,action.payload);
      console.log(response.data);
      dispatch(loadAssetSuccess(response.data));
    } catch (error) {
      dispatch(loadAssetFailure(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

const assetFlow = [loadAssetsFlow, trackAssetFlow];

export default assetFlow;
