"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = require("../reducer/user");

var uiActions = _interopRequireWildcard(require("../reducer/ui"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var performSignInFlow = function performSignInFlow(_ref) {
  var postSignIn = _ref.postSignIn;
  return function (_ref2) {
    var dispatch = _ref2.dispatch;
    return function (next) {
      return function _callee(action) {
        var response;
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                next(action);

                if (!(action.type === _user.performSignin.type)) {
                  _context.next = 14;
                  break;
                }

                dispatch(uiActions.setLoading(true));
                _context.prev = 3;
                _context.next = 6;
                return regeneratorRuntime.awrap(postSignIn(action.payload));

              case 6:
                response = _context.sent;
                if (response.error) dispatch((0, _user.loadError)(response.error));else dispatch((0, _user.loadUser)(response.data));
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);
                dispatch((0, _user.loadError)(_context.t0));

              case 13:
                dispatch(uiActions.setLoading(false));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[3, 10]]);
      };
    };
  };
};

var performSignUpFlow = function performSignUpFlow(_ref3) {
  var postSignUp = _ref3.postSignUp;
  return function (_ref4) {
    var dispatch = _ref4.dispatch;
    return function (next) {
      return function _callee2(action) {
        var response;
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                next(action);

                if (!(action.type === _user.performSignUp.type)) {
                  _context2.next = 14;
                  break;
                }

                dispatch(uiActions.setLoading(true));
                _context2.prev = 3;
                _context2.next = 6;
                return regeneratorRuntime.awrap(postSignUp(action.payload));

              case 6:
                response = _context2.sent;
                if (response.error) dispatch((0, _user.loadError)(response.error));else dispatch((0, _user.loadUser)(response.data));
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](3);
                dispatch((0, _user.loadError)(_context2.t0));

              case 13:
                dispatch(uiActions.setLoading(false));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, null, null, [[3, 10]]);
      };
    };
  };
};

var getProfileFlow = function getProfileFlow() {
  return function (_ref5) {
    var dispatch = _ref5.dispatch,
        getState = _ref5.getState;
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