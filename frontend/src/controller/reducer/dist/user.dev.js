"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = exports.getUser = exports["default"] = exports.loadError = exports.loadUser = exports.loadProfile = exports.performSignUp = exports.performSignin = exports.counterSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var counterSlice = (0, _toolkit.createSlice)({
  name: "user",
  initialState: {
    error: null,
    name: "",
    email: "",
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcnVsMzY1QGdtYWlsLmNvbSIsImlhdCI6MTYxNTQ3NTc3MH0.OgPINiPGMGz432TeWiCk5AC967JTRU1sOr-wuyOKfTc'
  },
  reducers: {
    performSignin: function performSignin() {},
    performSignUp: function performSignUp() {},
    loadUser: function loadUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    loadError: function loadError(state, action) {
      state.error = action.payload;
    },
    loadProfile: function loadProfile() {}
  }
});
exports.counterSlice = counterSlice;
var _counterSlice$actions = counterSlice.actions,
    performSignin = _counterSlice$actions.performSignin,
    performSignUp = _counterSlice$actions.performSignUp,
    loadProfile = _counterSlice$actions.loadProfile,
    loadUser = _counterSlice$actions.loadUser,
    loadError = _counterSlice$actions.loadError;
exports.loadError = loadError;
exports.loadUser = loadUser;
exports.loadProfile = loadProfile;
exports.performSignUp = performSignUp;
exports.performSignin = performSignin;
var _default = counterSlice.reducer;
exports["default"] = _default;

var getUser = function getUser(state) {
  return state.user.user;
};

exports.getUser = getUser;

var getToken = function getToken(state) {
  return state.user.user.token;
};

exports.getToken = getToken;