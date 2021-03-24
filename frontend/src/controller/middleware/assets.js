import {
  loadAssets,
  loadAssetsSuccess,
  loadAssetsFailure,
} from "../reducer/assets";
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
        getState().assets.assetType
      );
      console.log(response.data);
      dispatch(loadAssetsSuccess(response.data));
    } catch (error) {
      dispatch(loadAssetsFailure(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};


const assetsFlow = [
  loadAssetsFlow,
];

export default assetsFlow;
