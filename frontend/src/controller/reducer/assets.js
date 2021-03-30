import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "assets",
  initialState: {
    assetList: [],
    assetType: "",
    error: null,
  },
  reducers: {
    loadAssets: () => {},
    loadAssetsSuccess: (state, action) => {
      state.assetList = action.payload.data;
    },
    loadAssetsFailure: () => {},
    setAssetType: (state, action) => {
      state.assetType = action.payload;
    },
  },
});

export const {
  loadAssets,
  loadAssetsSuccess,
  loadAssetsFailure,
  setAssetType,
} = counterSlice.actions;

export default counterSlice.reducer;

export const getAssets = (state) => state.assets.assetList;

export const getAssetsLength = (state) => state.assets.assetList.length;

export const getAssetType = (state) => state.assets.assetType;
