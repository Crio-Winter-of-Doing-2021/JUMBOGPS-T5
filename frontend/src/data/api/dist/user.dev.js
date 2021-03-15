"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profile = exports.signup = exports.signin = void 0;

var _axios = _interopRequireDefault(require("axios"));

var Urls = _interopRequireWildcard(require("../constants/Urls"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signin = function signin(tempUser) {
  return regeneratorRuntime.async(function signin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", _axios["default"].post(Urls.SIGN_IN_URL, {
            email: tempUser.email,
            password: tempUser.password
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.signin = signin;

var signup = function signup(tempUser) {
  return regeneratorRuntime.async(function signup$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", _axios["default"].post(Urls.SIGN_UP_URL, {
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.password
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.signup = signup;

var profile = function profile(authToken) {
  return _axios["default"].get(Urls.PROFILE_URL, {
    headers: {
      Authorization: "Token ".concat(authToken)
    }
  });
};

exports.profile = profile;