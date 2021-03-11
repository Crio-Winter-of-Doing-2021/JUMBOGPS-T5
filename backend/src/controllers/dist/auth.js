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
var jwt_1 = require("../utils/jwt");
var password_1 = require("../utils/password");
var User = require("../models/User");
var validationResult = require("express-validator").validationResult;
exports.signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, name, password, email, hash_password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({
                            error: {
                                message: errors.array()[0].msg
                            },
                            data: {}
                        })];
                }
                name = req.body.name;
                password = req.body.password;
                email = req.body.email;
                return [4 /*yield*/, password_1.hashPassword(password)];
            case 1:
                hash_password = _a.sent();
                user = new User({
                    name: name,
                    email: email,
                    password: hash_password
                });
                return [4 /*yield*/, user.save(function (err) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b, _c, _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    if (err) {
                                        return [2 /*return*/, res.status(422).json({
                                                error: {
                                                    message: err.message
                                                },
                                                data: {}
                                            })];
                                    }
                                    _b = (_a = res.status(201)).json;
                                    _c = {};
                                    _d = {
                                        name: user.name,
                                        email: user.email
                                    };
                                    return [4 /*yield*/, jwt_1.sign(email)];
                                case 1: return [2 /*return*/, _b.apply(_a, [(_c.data = (_d.token = _e.sent(),
                                            _d),
                                            _c.error = {},
                                            _c)])];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, email, password;
    return __generator(this, function (_a) {
        errors = validationResult(req);
        if (!errors.isEmpty()) {
            return [2 /*return*/, res.status(422).json({
                    error: {
                        message: errors.array()[0].msg
                    },
                    data: {}
                })];
        }
        email = req.body.email;
        password = req.body.password;
        User.findOne({ email: email }, function (err, user) { return __awaiter(void 0, void 0, void 0, function () {
            var passwordMatch, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (err || !user) {
                            return [2 /*return*/, res.status(401).json({
                                    error: {
                                        message: "User not found"
                                    },
                                    data: {}
                                })];
                        }
                        return [4 /*yield*/, password_1.matchPassword(user.password, password)];
                    case 1:
                        passwordMatch = _e.sent();
                        if (passwordMatch == false) {
                            return [2 /*return*/, res.status(401).json({
                                    error: {
                                        message: "Wrong password"
                                    },
                                    data: {}
                                })];
                        }
                        _b = (_a = res.status(200)).json;
                        _c = {};
                        _d = {
                            name: user.name,
                            email: user.email
                        };
                        return [4 /*yield*/, jwt_1.sign(email)];
                    case 2: return [2 /*return*/, _b.apply(_a, [(_c.data = (_d.token = _e.sent(),
                                _d),
                                _c.error = {},
                                _c)])];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        data = req.email;
        User.findOne({ email: data.email }, function (err, user) {
            if (err || !user) {
                return res.status(401).json({
                    error: {
                        message: "No user with this email exists"
                    },
                    data: {}
                });
            }
            return res.status(200).json({
                data: {
                    email: user.email,
                    name: user.name
                },
                error: {}
            });
        });
        return [2 /*return*/];
    });
}); };
