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
exports.MenuitemsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var menuitem_entity_1 = require("src/entities/menuitem.entity");
var Constants_1 = require("src/helpers/Constants");
var MenuitemsService = /** @class */ (function () {
    function MenuitemsService(menuItemRepo) {
        this.menuItemRepo = menuItemRepo;
    }
    MenuitemsService.prototype.addMenuItem = function (menuItem) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItemFund, menuItemEntity, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.menuItemRepo.findOne({
                                where: { id: menuItem.nameEn },
                                loadRelationIds: true
                            })];
                    case 1:
                        menuItemFund = _a.sent();
                        if (!(menuItemFund !== null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.menuItemRepo.create(menuItem)];
                    case 2:
                        menuItemEntity = _a.sent();
                        return [4 /*yield*/, menuItemEntity.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                menuItemEntity: menuItemEntity,
                                status: new Constants_1.Constants().PREMADE_STATUS.Success_Created
                            }];
                    case 4: return [2 /*return*/, {
                            message: 'There is already a menu item with that name',
                            status: new Constants_1.Constants().PREMADE_STATUS.Fail_Created
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_1
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    MenuitemsService.prototype.addSubMenuItem = function (menuItem) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItemFnd, menuItemEntity, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.menuItemRepo.findOne({
                                where: { id: menuItem.nameEn },
                                loadRelationIds: true
                            })];
                    case 1:
                        menuItemFnd = _a.sent();
                        if (!(menuItemFnd !== null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.menuItemRepo.create(menuItem)];
                    case 2:
                        menuItemEntity = _a.sent();
                        return [4 /*yield*/, menuItemEntity.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                menuItemEntity: menuItemEntity,
                                status: new Constants_1.Constants().PREMADE_STATUS.Success_Created
                            }];
                    case 4: return [2 /*return*/, {
                            message: 'There is already a menu item with that name',
                            status: new Constants_1.Constants().PREMADE_STATUS.Fail_Created
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_2
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    MenuitemsService.prototype.removeMenuItem = function (menuItemId) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItem, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.menuItemRepo.findOne({
                                where: { id: menuItemId },
                                loadRelationIds: true
                            })];
                    case 1:
                        menuItem = _a.sent();
                        return [4 /*yield*/, menuItem.remove()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                menuItem: menuItem,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_DELETED
                            }];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_3
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MenuitemsService.prototype.updateMenuItem = function (menuItemId, menuItemUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItem, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.menuItemRepo.update({ id: +menuItemId }, menuItemUpdate)];
                    case 1:
                        menuItem = _a.sent();
                        return [2 /*return*/, {
                                menuItem: menuItem,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_UPDATED
                            }];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_4
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MenuitemsService.prototype.findSubUserMenuItems = function (langId) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItems, menuItemNames_1, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.menuItemRepo.find({
                                where: { isSub: true },
                                loadRelationIds: true
                            })];
                    case 1:
                        menuItems = _a.sent();
                        menuItemNames_1 = [];
                        menuItems.forEach(function (item) {
                            if (langId === '1') {
                                menuItemNames_1.push(item.nameEn);
                            }
                            else {
                                menuItemNames_1.push(item.nameAr);
                            }
                        });
                        return [2 /*return*/, {
                                menuArray: menuItems,
                                length: menuItems.length,
                                menuItemNames: menuItemNames_1,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_GET
                            }];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_5
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MenuitemsService.prototype.findUserMenuItems = function (langId) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItems, menuItemNames_2, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.menuItemRepo.find({
                                where: { isUser: true },
                                loadRelationIds: true
                            })];
                    case 1:
                        menuItems = _a.sent();
                        menuItemNames_2 = [];
                        menuItems.forEach(function (item) {
                            if (langId === '1') {
                                menuItemNames_2.push(item.nameEn);
                            }
                            else {
                                menuItemNames_2.push(item.nameAr);
                            }
                        });
                        return [2 /*return*/, {
                                menuArray: menuItems,
                                length: menuItems.length,
                                menuItemNames: menuItemNames_2,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_GET
                            }];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_6
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MenuitemsService.prototype.findDoctorMenuItems = function (langId) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItems, menuItemNames_3, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.menuItemRepo.find({
                                where: { isUser: false },
                                loadRelationIds: true
                            })];
                    case 1:
                        menuItems = _a.sent();
                        menuItemNames_3 = [];
                        menuItems.forEach(function (item) {
                            if (langId === '1') {
                                menuItemNames_3.push(item.nameEn);
                            }
                            else {
                                menuItemNames_3.push(item.nameAr);
                            }
                        });
                        return [2 /*return*/, {
                                menuArray: menuItems,
                                length: menuItems.length,
                                menuItemNames: menuItemNames_3,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_GET
                            }];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_7
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MenuitemsService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(menuitem_entity_1.MenuItem))
    ], MenuitemsService);
    return MenuitemsService;
}());
exports.MenuitemsService = MenuitemsService;
