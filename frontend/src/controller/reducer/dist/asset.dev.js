"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAsset = exports.getAssets = exports["default"] = exports.loadAssetFailure = exports.loadAssetSuccess = exports.loadAsset = exports.loadAssetsFailure = exports.loadAssetsSuccess = exports.loadAssets = exports.counterSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var counterSlice = (0, _toolkit.createSlice)({
  name: "asset",
  initialState: {
    assetList: [],
    asset: {},
    error: null
  },
  reducers: {
    loadAssets: function loadAssets() {},
    loadAssetsSuccess: function loadAssetsSuccess(state, action) {
      // console.log(action);
      state.assetList = action.payload.data;
    },
    loadAssetsFailure: function loadAssetsFailure() {},
    loadAsset: function loadAsset() {},
    loadAssetSuccess: function loadAssetSuccess(state, action) {
      // console.log(action);
      state.asset = action.payload.data;
    },
    loadAssetFailure: function loadAssetFailure() {}
  }
});
exports.counterSlice = counterSlice;
var _counterSlice$actions = counterSlice.actions,
    loadAssets = _counterSlice$actions.loadAssets,
    loadAssetsSuccess = _counterSlice$actions.loadAssetsSuccess,
    loadAssetsFailure = _counterSlice$actions.loadAssetsFailure,
    loadAsset = _counterSlice$actions.loadAsset,
    loadAssetSuccess = _counterSlice$actions.loadAssetSuccess,
    loadAssetFailure = _counterSlice$actions.loadAssetFailure;
exports.loadAssetFailure = loadAssetFailure;
exports.loadAssetSuccess = loadAssetSuccess;
exports.loadAsset = loadAsset;
exports.loadAssetsFailure = loadAssetsFailure;
exports.loadAssetsSuccess = loadAssetsSuccess;
exports.loadAssets = loadAssets;
var _default = counterSlice.reducer;
exports["default"] = _default;

var getAssets = function getAssets(state) {
  return state.asset.assetList;
};

exports.getAssets = getAssets;

var getAsset = function getAsset(state) {
  return state.asset.asset;
};

exports.getAsset = getAsset;