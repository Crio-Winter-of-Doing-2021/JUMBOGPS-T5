"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssetId = exports.getAsset = exports.getAssets = exports["default"] = exports.setAssetId = exports.loadAssetFailure = exports.loadAssetSuccess = exports.loadAsset = exports.loadAssetsFailure = exports.loadAssetsSuccess = exports.loadAssets = exports.counterSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var counterSlice = (0, _toolkit.createSlice)({
  name: "asset",
  initialState: {
    assetList: [],
    asset: {},
    assetId: '',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcnVsMzY1QGdtYWlsLmNvbSIsImlhdCI6MTYxNTQ3NTc3MH0.OgPINiPGMGz432TeWiCk5AC967JTRU1sOr-wuyOKfTc',
    error: null
  },
  reducers: {
    loadAssets: function loadAssets() {},
    loadAssetsSuccess: function loadAssetsSuccess(state, action) {
      state.assetList = action.payload.data;
    },
    loadAssetsFailure: function loadAssetsFailure() {},
    loadAsset: function loadAsset() {},
    loadAssetSuccess: function loadAssetSuccess(state, action) {
      state.asset = action.payload.data;
    },
    loadAssetFailure: function loadAssetFailure() {},
    setAssetId: function setAssetId(state, action) {
      state.assetId = action.payload;
    }
  }
});
exports.counterSlice = counterSlice;
var _counterSlice$actions = counterSlice.actions,
    loadAssets = _counterSlice$actions.loadAssets,
    loadAssetsSuccess = _counterSlice$actions.loadAssetsSuccess,
    loadAssetsFailure = _counterSlice$actions.loadAssetsFailure,
    loadAsset = _counterSlice$actions.loadAsset,
    loadAssetSuccess = _counterSlice$actions.loadAssetSuccess,
    loadAssetFailure = _counterSlice$actions.loadAssetFailure,
    setAssetId = _counterSlice$actions.setAssetId;
exports.setAssetId = setAssetId;
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

var getAssetId = function getAssetId(state) {
  return state.asset.assetId;
};

exports.getAssetId = getAssetId;