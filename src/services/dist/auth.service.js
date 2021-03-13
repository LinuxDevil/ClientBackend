"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var doctor_entity_1 = require("src/entities/doctor.entity");
var user_entity_1 = require("src/entities/user.entity");
var AuthService = /** @class */ (function () {
    function AuthService(userRepo, doctorRepo, jwtService, smsService) {
        this.userRepo = userRepo;
        this.doctorRepo = doctorRepo;
        this.jwtService = jwtService;
        this.smsService = smsService;
    }
    AuthService.prototype.deleteUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({ where: { username: username } })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.userRepo["delete"](user.id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService.prototype.verify = function (username, code) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('verify', username);
                        return [4 /*yield*/, this.smsService.checkVerification(username, code)];
                    case 1:
                        response = _a.sent();
                        if (!(response === 'approved')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.smsService.sendSMS(username, "Hello, Welcome to My Clinic App")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'Approved!',
                                status: 1
                            }];
                    case 3: return [2 /*return*/, {
                            message: 'Wrong Code',
                            status: 0
                        }];
                }
            });
        });
    };
    AuthService.prototype.register = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var user, payload, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        user = this.userRepo.create(credentials);
                        console.log("GOt user", credentials);
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _a.sent();
                        payload = { username: user.username };
                        console.log("payload", payload);
                        return [4 /*yield*/, this.smsService.sendVerification(user.username)];
                    case 2:
                        _a.sent();
                        token = this.jwtService.sign(payload);
                        return [2 /*return*/, { user: __assign(__assign({}, user.toJSON()), { token: token }) }];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.code === '23505') {
                            throw new common_1.ConflictException('Username has already been taken');
                        }
                        return [2 /*return*/, new common_1.InternalServerErrorException()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.login = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isValid, payload, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userRepo.findOne({ where: { username: credentials.email } })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, user.comparePassword(credentials.password)];
                    case 2:
                        isValid = _a.sent();
                        if (!isValid) {
                            throw new Error();
                        }
                        return [4 /*yield*/, this.smsService.sendVerification(user.username)];
                    case 3:
                        _a.sent();
                        payload = { username: user.username };
                        token = this.jwtService.sign(payload);
                        return [2 /*return*/, { user: __assign(__assign({}, user.toJSON()), { token: token }) }];
                    case 4:
                        error_2 = _a.sent();
                        throw new common_1.UnauthorizedException("Invalid Credintials");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.registerDoctor = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var user, payload, token, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        user = this.doctorRepo.create(credentials);
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _a.sent();
                        payload = { username: user.username };
                        return [4 /*yield*/, this.smsService.sendVerification(user.username)];
                    case 2:
                        _a.sent();
                        token = this.jwtService.sign(payload);
                        return [2 /*return*/, { doctor: __assign(__assign({}, user.toJSON()), { token: token }) }];
                    case 3:
                        error_3 = _a.sent();
                        if (error_3.code === '23505') {
                            throw new common_1.ConflictException('Username has already been taken');
                        }
                        return [2 /*return*/, new common_1.InternalServerErrorException()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.loginDoctor = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isValid, payload, token, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.doctorRepo.findOne({ where: { username: credentials.password } })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, user.comparePassword(credentials.password)];
                    case 2:
                        isValid = _a.sent();
                        if (!isValid) {
                            throw new Error();
                        }
                        return [4 /*yield*/, this.smsService.sendVerification(user.username)];
                    case 3:
                        _a.sent();
                        payload = { username: user.username };
                        token = this.jwtService.sign(payload);
                        return [2 /*return*/, { doctor: __assign(__assign({}, user.toJSON()), { token: token }) }];
                    case 4:
                        error_4 = _a.sent();
                        throw new common_1.UnauthorizedException("Invalid Credintials");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.refreshToken = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var error, usernameToken, token;
            return __generator(this, function (_a) {
                console.log(username);
                if (username === undefined) {
                    error = new Error("Please provide a good username");
                    return [2 /*return*/, {
                            error: error,
                            status: 0
                        }];
                }
                usernameToken = this.jwtService.decode(username);
                if (usernameToken === null)
                    return [2 /*return*/, {
                            message: "decoding failed",
                            status: 0
                        }];
                console.log(usernameToken);
                token = this.jwtService.sign({ username: usernameToken['username'] });
                console.log(token);
                return [2 /*return*/, {
                        token: token,
                        status: 1
                    }];
            });
        });
    };
    AuthService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
        __param(1, typeorm_1.InjectRepository(doctor_entity_1.DoctorEntity))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
