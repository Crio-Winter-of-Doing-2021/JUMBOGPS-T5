"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _marker = _interopRequireDefault(require("../../assets/markers/marker.png"));

var _truck = _interopRequireDefault(require("../../assets/markers/truck.png"));

var _man = _interopRequireDefault(require("../../assets/markers/man.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Markers = {
  simple: _marker["default"],
  truck: _truck["default"],
  salesman: _man["default"]
};
var _default = Markers;
exports["default"] = _default;