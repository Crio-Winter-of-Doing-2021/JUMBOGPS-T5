import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "asset",
  initialState: {
    asset: {},
    dateRange: { start: null, end: null },
    assetInfo: { id: "", name: "" },
    geoJSON: null,
    error: null,
  },
  reducers: {
    loadAsset: () => {},
    loadAssetSuccess: (state, action) => {
      state.asset = action.payload.data;
      state.assetInfo.id = state.asset.asset_data._id;
      state.assetInfo.name = state.asset.asset_data.name;
    },
    setGeoJSON: (state, action) => {
      state.geoJSON = action.payload;
    },
    loadAssetFailure: () => {},
    setAssetInfo: (state, action) => {
      state.assetInfo.id = action.payload.id;
      state.assetInfo.name = action.payload.name;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
  },
});

export const {
  loadAsset,
  loadAssetSuccess,
  loadAssetFailure,
  setAssetInfo,
  setDateRange,
  setGeoJSON,
} = counterSlice.actions;

export default counterSlice.reducer;

export const getAsset = (state) => state.asset.asset;

export const getAssetInfo = (state) => state.asset.assetInfo;

export const getGeoJSON = (state) => state.asset.geoJSON;

export const getDateRange = (state) => state.asset.dateRange;
