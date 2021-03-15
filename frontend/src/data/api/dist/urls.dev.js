"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assetListUrl = exports.trackUrl = exports.ASSET_LIST_URL = exports.PROFILE_URL = exports.SIGN_UP_URL = exports.SIGN_IN_URL = exports.BASE_URL = void 0;
var BASE_URL = "http://localhost:8000";
exports.BASE_URL = BASE_URL;
var SIGN_IN_URL = "".concat(BASE_URL, "/auth/auth/signin");
exports.SIGN_IN_URL = SIGN_IN_URL;
var SIGN_UP_URL = "".concat(BASE_URL, "/auth/auth/signup");
exports.SIGN_UP_URL = SIGN_UP_URL;
var PROFILE_URL = "".concat(BASE_URL, "/auth/auth/user");
exports.PROFILE_URL = PROFILE_URL;
var ASSET_LIST_URL = "".concat(BASE_URL, "/api/asset/list");
exports.ASSET_LIST_URL = ASSET_LIST_URL;

var trackUrl = function trackUrl(id) {
  return "".concat(BASE_URL, "/api/asset/track/").concat(id);
};

exports.trackUrl = trackUrl;

var assetListUrl = function assetListUrl(type) {
  return "".concat(BASE_URL, "/api/asset/list?type=").concat(type);
};

exports.assetListUrl = assetListUrl;