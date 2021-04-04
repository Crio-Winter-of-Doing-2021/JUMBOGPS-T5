import logger from "../../utils/logger";
import {
  loadAssets,
  loadAssetsSuccess,
  setAssetType,
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
      if(!action.payload || action.payload.mounted)      
        dispatch(loadAssetsSuccess(response.data));
      logger(response.data);
    } catch (error) {
      dispatch(uiActions.setError(error));
    }
    dispatch(uiActions.setLoading(false));
  }
};

const setAssetTypeFlow = () => ({ dispatch, getState }) => (
  next
) =>  (action) => {
  next(action);
  if (action.type === setAssetType.type) {
    dispatch(loadAssets());
  }
};

const assetsFlow = [loadAssetsFlow,setAssetTypeFlow];

export default assetsFlow;
