import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "asset",
  initialState: {
    assetList: [],
    asset: {},
    error: null,
  },
  reducers: {
    loadAssets: () => {},
    loadAssetsSuccess: (state, action) => {
      // console.log(action);
      state.assetList = action.payload.data;
    },
    loadAssetsFailure: () => {},
    loadAsset: () => {},
    loadAssetSuccess: (state, action) => {
      // console.log(action);
      state.asset = action.payload.data;
    },
    loadAssetFailure: () => {},
  },
});

export const {
  loadAssets,
  loadAssetsSuccess,
  loadAssetsFailure,
  loadAsset,
  loadAssetSuccess,
  loadAssetFailure,
} = counterSlice.actions;

export default counterSlice.reducer;

export const getAssets = (state) => state.asset.assetList;

export const getAsset = (state) => state.asset.asset;
