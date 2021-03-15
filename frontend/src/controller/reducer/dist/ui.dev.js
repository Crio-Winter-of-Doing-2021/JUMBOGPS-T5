"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getError = exports.getTabId = exports.getShowLogout = exports.getLoading = exports["default"] = exports.setError = exports.setTabId = exports.setshowLogoutModal = exports.setLoading = exports.pageLoaded = exports.counterSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var counterSlice = (0, _toolkit.createSlice)({
  name: "ui",
  initialState: {
    loading: false,
    showLogoutModal: false,
    tabId: "1",
    error: ""
  },
  reducers: {
    pageLoaded: function pageLoaded() {},
    setLoading: function setLoading(state, action) {
      return _objectSpread({}, state, {
        loading: action.payload
      });
    },
    setshowLogoutModal: function setshowLogoutModal(state, action) {
      return _objectSpread({}, state, {
        showLogoutModal: action.payload
      });
    },
    setTabId: function setTabId(state, action) {
      return _objectSpread({}, state, {
        tabId: action.payload
      });
    },
    setError: function setError(state, action) {
      return _objectSpread({}, state, {
        error: action.payload
      });
    }
  }
});
exports.counterSlice = counterSlice;
var _counterSlice$actions = counterSlice.actions,
    pageLoaded = _counterSlice$actions.pageLoaded,
    setLoading = _counterSlice$actions.setLoading,
    setshowLogoutModal = _counterSlice$actions.setshowLogoutModal,
    setTabId = _counterSlice$actions.setTabId,
    setError = _counterSlice$actions.setError;
exports.setError = setError;
exports.setTabId = setTabId;
exports.setshowLogoutModal = setshowLogoutModal;
exports.setLoading = setLoading;
exports.pageLoaded = pageLoaded;
var _default = counterSlice.reducer;
exports["default"] = _default;

var getLoading = function getLoading(state) {
  return state.ui.loading;
};

exports.getLoading = getLoading;

var getShowLogout = function getShowLogout(state) {
  return state.ui.showLogoutModal;
};

exports.getShowLogout = getShowLogout;

var getTabId = function getTabId(state) {
  return state.ui.tabId;
};

exports.getTabId = getTabId;

var getError = function getError(state) {
  return state.ui.error;
};

exports.getError = getError;