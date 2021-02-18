"use strict";
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
exports.InsuranceService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var insurance_entity_1 = require("src/entities/insurance.entity");
var InsuranceService = /** @class */ (function () {
    function InsuranceService(insuranceRepoo) {
        this.insuranceRepoo = insuranceRepoo;
    }
    InsuranceService.prototype.addInsuranceCompany = function (insurance) {
        return __awaiter(this, void 0, void 0, function () {
            var insuranceEntity, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.insuranceRepoo.create(insurance)];
                    case 1:
                        insuranceEntity = _a.sent();
                        return [4 /*yield*/, insuranceEntity.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                insuranceEntity: insuranceEntity,
                                status: 1,
                                message: 'Success'
                            }];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                status: 0,
                                message: 'There was an error',
                                error: error_1
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InsuranceService.prototype.updateInsuranceCompany = function (insurance) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedInsurance, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.insuranceRepoo.update({ nameEn: insurance.nameEn }, insurance)];
                    case 1:
                        updatedInsurance = _a.sent();
                        return [2 /*return*/, {
                                updatedInsurance: updatedInsurance,
                                status: 1,
                                message: 'Success'
                            }];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, {
                                status: 0,
                                message: 'There was an error',
                                error: error_2
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InsuranceService.prototype.deleteInsuranceCompany = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var insurance, removedInsurance, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.insuranceRepoo.findOne({ where: { id: id } })];
                    case 1:
                        insurance = _a.sent();
                        return [4 /*yield*/, this.insuranceRepoo.remove(insurance)];
                    case 2:
                        removedInsurance = _a.sent();
                        return [2 /*return*/, {
                                removedInsurance: removedInsurance,
                                status: 1,
                                message: 'Success'
                            }];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, {
                                status: 0,
                                message: 'There was an error',
                                error: error_3
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InsuranceService.prototype.getInsurances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var insurances, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.insuranceRepoo.find()];
                    case 1:
                        insurances = _a.sent();
                        return [2 /*return*/, { insurances: insurances }];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, {
                                status: 0,
                                message: 'There was an error',
                                error: error_4
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InsuranceService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(insurance_entity_1.InsuranceCompanyEntity))
    ], InsuranceService);
    return InsuranceService;
}());
exports.InsuranceService = InsuranceService;
