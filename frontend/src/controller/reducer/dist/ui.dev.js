"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAsset = exports.getLoading = exports["default"] = exports.loadAssetCard = exports.setLoading = exports.pageLoaded = exports.counterSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var counterSlice = (0, _toolkit.createSlice)({
  name: "ui",
  initialState: {
    loading: false,
    asset: {}
  },
  reducers: {
    pageLoaded: function pageLoaded() {},
    setLoading: function setLoading(state, action) {
      return _objectSpread({}, state, {
        loading: action.payload
      });
    },
    loadAssetCard: function loadAssetCard(state, action) {
      return _objectSpread({}, state, {
        asset: action.payload
      });
    }
  }
});
exports.counterSlice = counterSlice;
var _counterSlice$actions = counterSlice.actions,
    pageLoaded = _counterSlice$actions.pageLoaded,
    setLoading = _counterSlice$actions.setLoading,
    loadAssetCard = _counterSlice$actions.loadAssetCard;
exports.loadAssetCard = loadAssetCard;
exports.setLoading = setLoading;
exports.pageLoaded = pageLoaded;
var _default = counterSlice.reducer;
exports["default"] = _default;

var getLoading = function getLoading(state) {
  return state.ui.loading;
};

exports.getLoading = getLoading;

var getAsset = function getAsset(state) {
  return state.ui.asset;
};

exports.getAsset = getAsset;