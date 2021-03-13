import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "asset",
  initialState: {
    assetList: [],
    asset: {},
    assetId:'',
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcnVsMzY1QGdtYWlsLmNvbSIsImlhdCI6MTYxNTQ3NTc3MH0.OgPINiPGMGz432TeWiCk5AC967JTRU1sOr-wuyOKfTc',
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
    setAssetId:  (state, action) => {
      state.assetId = action.payload;
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
  setAssetId
} = counterSlice.actions;

export default counterSlice.reducer;

export const getAssets = (state) => state.asset.assetList;

export const getAsset = (state) => state.asset.asset;

export const getAssetId = (state) => state.asset.assetId;
