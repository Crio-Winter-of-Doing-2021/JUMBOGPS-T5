import {
  loadAssets,
  loadAssetsSuccess,
} from "../reducer/assets";
import * as uiActions from "../reducer/ui";

/**
* Asset List  Middleware
* @description
* Make API Call to get all assets
* Dispatches loadAssetsSuccess(response.data) ,setGeoJSON(geoJSON), 
* Dispatches setError(err) on failure.
* @param {function} services.getAssetList get asset list api 
*/
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
      dispatch(loadAssetsSuccess(response.data));
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

const assetsFlow = [loadAssetsFlow];

export default assetsFlow;
