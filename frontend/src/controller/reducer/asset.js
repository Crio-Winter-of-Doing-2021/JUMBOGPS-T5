import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "asset",
  initialState: {
    assetList: [],
    asset: {},
    assetType:"",
    assetInfo:{id:'',name:''},
    error: null,
  },
  reducers: {
    loadAssets: () => {},
    loadAssetsSuccess: (state, action) => {
      state.assetList = action.payload.data;
    },
    loadAssetsFailure: () => {},
    loadAsset: () => {},
    loadAssetSuccess: (state, action) => {
      state.asset = action.payload.data;
    },
    loadAssetFailure: () => {},
    setAssetInfo:  (state, action) => {
      state.assetInfo.id = action.payload.id;
      state.assetInfo.name = action.payload.name;
    },
    setAssetType: (state, action) => {
      state.assetType = action.payload;
    },
  },
});

export const {
  loadAssets,
  loadAssetsSuccess,
  loadAssetsFailure,
  loadAsset,
  loadAssetSuccess,
  loadAssetFailure,
  setAssetInfo,
  setAssetType
} = counterSlice.actions;

export default counterSlice.reducer;

export const getAssets = (state) => state.asset.assetList;

export const getAsset = (state) => state.asset.asset;

export const getAssetType = (state) => state.asset.assetType;

export const getAssetInfo = (state) => state.asset.assetInfo;
