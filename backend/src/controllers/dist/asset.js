"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Asset = require("../models/Asset");
var AssetTrack = require("../models/AssetTrack");
exports.createAsset = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data_asset, track_data_asset, asset;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data_asset = {
                    name: req.body.name,
                    desc: req.body.desc,
                    type: req.body.type,
                    image_url: req.body.image_url,
                    body: req.body.body,
                    lat: req.body.lat,
                    lon: req.body.lon,
                    timestamp: req.body.timestamp
                };
                track_data_asset = {
                    lat: req.body.lat,
                    lon: req.body.lon,
                    timestamp: req.body.timestamp
                };
                asset = new Asset(data_asset);
                return [4 /*yield*/, asset.save(function (err, result) { return __awaiter(void 0, void 0, void 0, function () {
                        var asset_track;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        console.log(err);
                                        return [2 /*return*/, res.status(422).json({
                                                data: {},
                                                errors: err.message
                                            })];
                                    }
                                    asset_track = new AssetTrack({
                                        _id: result._id,
                                        track: [track_data_asset]
                                    });
                                    return [4 /*yield*/, asset_track.save(function (error, results) {
                                            if (err) {
                                                return res.status(422).json({
                                                    data: {},
                                                    errors: error.message
                                                });
                                            }
                                            return res.status(201).json({
                                                data: result,
                                                errors: {}
                                            });
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateLocation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var asset_data, track_data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.lat || !req.body.lon || !req.body.timestamp) {
                    return [2 /*return*/, res.status(422).json({
                            data: {},
                            errors: "Lat, lon and timestamp are required"
                        })];
                }
                return [4 /*yield*/, Asset.updateOne({ _id: req.params.id }, {
                        $set: {
                            lat: req.body.lat,
                            lon: req.body.lon,
                            timestamp: req.body.timestamp
                        }
                    })];
            case 1:
                asset_data = _a.sent();
                return [4 /*yield*/, AssetTrack.updateOne({ _id: req.params.id }, {
                        $push: {
                            track: {
                                lat: req.body.lat,
                                lon: req.body.lon,
                                timestamp: req.body.timestamp
                            }
                        }
                    })];
            case 2:
                track_data = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        data: {
                            success: true
                        },
                        errors: {}
                    })];
        }
    });
}); };
exports.getAssets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Asset.find({})];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        data: data,
                        errors: {}
                    })];
        }
    });
}); };
exports.getAsset = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var asset_data, track_data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Asset.findOne({ _id: req.query._id }).exec()];
            case 1:
                asset_data = _a.sent();
                if (!asset_data) {
                    return [2 /*return*/, res.status(422).json({
                            errors: "Asset does not exist"
                        })];
                }
                return [4 /*yield*/, AssetTrack.findOne({ _id: req.query.id }).exec()];
            case 2:
                track_data = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        data: {
                            asset_data: asset_data,
                            track: track_data
                        }
                    })];
        }
    });
}); };
