"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _asset = require("../reducer/asset");

var uiActions = _interopRequireWildcard(require("../reducer/ui"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var loadAssetsFlow = function loadAssetsFlow(_ref) {
  var getAssetList = _ref.getAssetList;
  return function (_ref2) {
    var dispatch = _ref2.dispatch,
        getState = _ref2.getState;
    return function (next) {
      return function _callee(action) {
        var response;
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                next(action);

                if (!(action.type === _asset.loadAssets.type)) {
                  _context.next = 15;
                  break;
                }

                dispatch(uiActions.setLoading(true));
                _context.prev = 3;
                _context.next = 6;
                return regeneratorRuntime.awrap(getAssetList(getState().user.token, getState().asset.assetType));

              case 6:
                response = _context.sent;
                console.log(response.data);
                dispatch((0, _asset.loadAssetsSuccess)(response.data));
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](3);
                dispatch((0, _asset.loadAssetsFailure)(_context.t0));

              case 14:
                dispatch(uiActions.setLoading(false));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[3, 11]]);
      };
    };
  };
};

var trackAssetFlow = function trackAssetFlow(_ref3) {
  var getAssetTrack = _ref3.getAssetTrack;
  return function (_ref4) {
    var dispatch = _ref4.dispatch,
        getState = _ref4.getState;
    return function (next) {
      return function _callee2(action) {
        var response;
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                next(action);

                if (!(action.type === _asset.loadAsset.type)) {
                  _context2.next = 15;
                  break;
                }

                dispatch(uiActions.setLoading(true));
                _context2.prev = 3;
                _context2.next = 6;
                return regeneratorRuntime.awrap(getAssetTrack(getState().user.token, getState().asset.assetInfo.id));

              case 6:
                response = _context2.sent;
                // if(response.error) {
                //   dispatch(uiActions.setError("some error occurred"));
                // } else {
                console.log(response.data);
                dispatch((0, _asset.loadAssetSuccess)(response.data)); // }

                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](3);
                dispatch(uiActions.setError(_context2.t0));

              case 14:
                dispatch(uiActions.setLoading(false));

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, null, null, [[3, 11]]);
      };
    };
  };
};

var setAssetInfoFlow = function setAssetInfoFlow(_ref5) {
  _objectDestructuringEmpty(_ref5);

  return function (_ref6) {
    var dispatch = _ref6.dispatch;
    return function (next) {
      return function _callee3(action) {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                next(action);

                if (action.type === _asset.setAssetInfo.type) {
                  dispatch(uiActions.setTabId("2"));
                }

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        });
      };
    };
  };
};

var assetFlow = [loadAssetsFlow, trackAssetFlow, setAssetInfoFlow];
var _default = assetFlow;
exports["default"] = _default;