"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = require("../reducer/user");

var performSignInFlow = function performSignInFlow() {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        next(action);
      };
    };
  };
};

var performSignUpFlow = function performSignUpFlow() {
  return function (_ref2) {
    var dispatch = _ref2.dispatch,
        getState = _ref2.getState;
    return function (next) {
      return function (action) {
        next(action);
      };
    };
  };
};

var getProfileFlow = function getProfileFlow() {
  return function (_ref3) {
    var dispatch = _ref3.dispatch,
        getState = _ref3.getState;
    return function (next) {
      return function (action) {
        next(action);
      };
    };
  };
};

var userFlow = [performSignInFlow, performSignUpFlow, getProfileFlow];
var _default = userFlow;
exports["default"] = _default;