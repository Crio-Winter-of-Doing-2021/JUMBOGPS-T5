import {
  loadAssets,
  loadAssetsSuccess,
  loadAssetsFailure,
  loadAsset,
  loadAssetSuccess,
  loadAssetFailure,
} from "../reducer/asset";
import * as uiActions from "../reducer/ui";

const loadAssetsFlow = ({ getAssetList }) => ({ dispatch }) => (next) => async (
  action
) => {
  next(action);
  if (action.type === loadAssets.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await getAssetList('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcnVsMzY1QGdtYWlsLmNvbSIsImlhdCI6MTYxNTQ3NTc3MH0.OgPINiPGMGz432TeWiCk5AC967JTRU1sOr-wuyOKfTc');
      console.log(response.data);
      dispatch(loadAssetsSuccess(response.data));
    } catch (error) {
      dispatch(loadAssetsFailure(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

const trackAssetFlow = ({ getAssetTrack }) => ({ dispatch }) => (
  next
) => async (action) => {
  next(action);
  if (action.type === loadAsset.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await getAssetTrack('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcnVsMzY1QGdtYWlsLmNvbSIsImlhdCI6MTYxNTQ3NTc3MH0.OgPINiPGMGz432TeWiCk5AC967JTRU1sOr-wuyOKfTc','604657ccc2a35f68848d01eb');
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
