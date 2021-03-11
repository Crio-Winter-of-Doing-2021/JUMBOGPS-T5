"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _asset = require("../reducer/asset");

var _ui = require("../reducer/ui");

var pageLoadedFlow = function pageLoadedFlow() {
  return function (_ref) {
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        next(action);

        if (action.type === _ui.pageLoaded.type) {
          dispatch((0, _asset.loadAssets)());
        }
      };
    };
  };
};

var uiFlows = [pageLoadedFlow];
var _default = uiFlows;
exports["default"] = _default;