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
exports.ArmyplacesService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var armyplaces_entity_1 = require("src/entities/armyplaces.entity");
var city_entity_1 = require("src/entities/city.entity");
var doctor_entity_1 = require("src/entities/doctor.entity");
var Constants_1 = require("src/helpers/Constants");
var ArmyplacesService = /** @class */ (function () {
    function ArmyplacesService(armyPlaceRepo, cityRepository, doctorRepo) {
        this.armyPlaceRepo = armyPlaceRepo;
        this.cityRepository = cityRepository;
        this.doctorRepo = doctorRepo;
    }
    ArmyplacesService.prototype.getTimes = function (date, newDuration, shift) {
        var quarterHours = ['00'];
        if (newDuration === '0') {
            quarterHours = ['00', '15', '30', '45'];
        }
        else {
            var oldValue = +newDuration;
            while (newDuration < 60) {
                quarterHours.push(newDuration);
                newDuration = +newDuration + oldValue;
            }
        }
        var times = [];
        var appointmentStartTime = Number.parseInt(date.split(' ')[1]);
        for (var i = appointmentStartTime; i < appointmentStartTime + shift; i++) {
            for (var j = 0; j < quarterHours.length; j++) {
                var time = i + ':' + quarterHours[j];
                if (i < 10) {
                    time = '0' + time;
                }
                times.push(date.split(' ')[0] + ' ' + time);
            }
        }
        return times;
    };
    ArmyplacesService.prototype.getDaysArray = function (start, end, timeToAdd) {
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt).getDate() +
                '/' +
                (new Date(dt).getMonth() + 1) +
                '/' +
                new Date(dt).getFullYear() +
                ' ' +
                timeToAdd);
        }
        return arr;
    };
    ArmyplacesService.prototype.getDaysList = function (startDate, endDate, timeToAdd) {
        var daylist = this.getDaysArray(new Date(startDate), new Date(endDate), timeToAdd);
        daylist
            .map(function (v) {
            var thing = v.slice(0, 15);
            return thing;
        })
            .join('');
        return daylist;
    };
    //Create new armyPlace
    ArmyplacesService.prototype.createNewArmyPlace = function (armyPlace) {
        return __awaiter(this, void 0, void 0, function () {
            var city, armyPlaceEntity, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (armyPlace === null) {
                            return [2 /*return*/, new Error('Invalid input')];
                        }
                        return [4 /*yield*/, this.cityRepository.findOne({
                                where: { id: armyPlace.cityId }
                            })];
                    case 1:
                        city = _a.sent();
                        if (city === null)
                            return [2 /*return*/, new Error('City id is not found')];
                        return [4 /*yield*/, this.armyPlaceRepo.create(armyPlace)];
                    case 2:
                        armyPlaceEntity = _a.sent();
                        armyPlaceEntity.location = city;
                        return [4 /*yield*/, armyPlaceEntity.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                armyPlaceEntity: armyPlaceEntity,
                                status: new Constants_1.Constants().PREMADE_STATUS.Success_Created
                            }];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_1
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //Get all general armyPlaces
    ArmyplacesService.prototype.getAllGeneralArmyPlaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var armyPlaces, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.armyPlaceRepo.find({
                                relations: ['location', 'doctors']
                            })];
                    case 1:
                        armyPlaces = _a.sent();
                        return [2 /*return*/, {
                                armyPlaces: armyPlaces,
                                length: armyPlaces.length,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_GET
                            }];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_2
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Get all private armyPlaces
    ArmyplacesService.prototype.getAllPrivateArmyPlaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var armyPlaces, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.armyPlaceRepo.find({
                                where: { type: 'private' },
                                relations: ['location', 'doctors']
                            })];
                    case 1:
                        armyPlaces = _a.sent();
                        return [2 /*return*/, {
                                armyPlaces: armyPlaces,
                                length: armyPlaces.length,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_GET
                            }];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_3
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Get all private armyPlaces
    ArmyplacesService.prototype.getAllFilteredPrivateArmyPlaces = function (cityId) {
        return __awaiter(this, void 0, void 0, function () {
            var armyPlaces, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.armyPlaceRepo.find({
                                where: { type: 'private', location: { id: +cityId } },
                                relations: ['location', 'doctors']
                            })];
                    case 1:
                        armyPlaces = _a.sent();
                        return [2 /*return*/, {
                                armyPlaces: armyPlaces,
                                length: armyPlaces.length,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_GET
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
    //Get all private armyPlaces
    ArmyplacesService.prototype.getAllFilteredGeneralArmyPlaces = function (cityId) {
        return __awaiter(this, void 0, void 0, function () {
            var armyPlaces, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.armyPlaceRepo.find({
                                where: { type: 'general', location: { id: +cityId } },
                                relations: ['location', 'doctors']
                            })];
                    case 1:
                        armyPlaces = _a.sent();
                        return [2 /*return*/, {
                                armyPlaces: armyPlaces,
                                length: armyPlaces.length,
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
    //Get armyPlace by id
    ArmyplacesService.prototype.getArmyPlaceById = function (armyPlaceId) {
        return __awaiter(this, void 0, void 0, function () {
            var armyPlace, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.armyPlaceRepo.findOne({
                                where: { id: +armyPlaceId },
                                relations: ['location', 'doctors']
                            })];
                    case 1:
                        armyPlace = _a.sent();
                        if (armyPlace == null) {
                            return [2 /*return*/, {
                                    status: 0,
                                    message: 'There is no armyPlace with id ' + armyPlaceId
                                }];
                        }
                        return [2 /*return*/, { armyPlace: armyPlace, status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_GET }];
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
    ArmyplacesService.prototype.deleteArmyPlace = function (armyPlaceId) {
        return __awaiter(this, void 0, void 0, function () {
            var armyPlace, removed, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.armyPlaceRepo.findOne({
                                where: { id: +armyPlaceId },
                                relations: ['location', 'doctors']
                            })];
                    case 1:
                        armyPlace = _a.sent();
                        console.log(armyPlace);
                        if (armyPlace === null || armyPlace === undefined)
                            return [2 /*return*/, {
                                    status: 0,
                                    message: 'ArmyPlace not found'
                                }];
                        return [4 /*yield*/, armyPlace.remove()];
                    case 2:
                        removed = _a.sent();
                        return [2 /*return*/, {
                                deleted: removed,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_DELETED
                            }];
                    case 3:
                        error_7 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_7
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ArmyplacesService.prototype.deleteAllArmyPlaces = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var removed, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.armyPlaceRepo["delete"]({ type: type })];
                    case 1:
                        removed = _a.sent();
                        return [2 /*return*/, {
                                deleted: removed,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_DELETED
                            }];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_8
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //TODO: Add doctor to armyPlace
    ArmyplacesService.prototype.addDoctor = function (doctorId, armyPlaceId) {
        return __awaiter(this, void 0, void 0, function () {
            var armyPlace, doctor, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.armyPlaceRepo.findOne({
                                where: { id: +armyPlaceId },
                                relations: ['location', 'doctors']
                            })];
                    case 1:
                        armyPlace = _a.sent();
                        if (armyPlace === null || armyPlace === undefined) {
                            return [2 /*return*/, {
                                    message: "There's no armyPlace with that id",
                                    status: 0
                                }];
                        }
                        return [4 /*yield*/, this.doctorRepo.findOne({
                                where: { id: +doctorId }
                            })];
                    case 2:
                        doctor = _a.sent();
                        if (doctor === null || doctor === undefined) {
                            return [2 /*return*/, {
                                    message: "There's no doctor with that id",
                                    status: 0
                                }];
                        }
                        if (armyPlace.doctors === undefined || armyPlace.doctors === null) {
                            armyPlace.doctors = [];
                        }
                        return [4 /*yield*/, armyPlace.doctors.push(doctor)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, armyPlace.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, {
                                armyPlace: armyPlace,
                                status: new Constants_1.Constants().PREMADE_STATUS.Success_Created
                            }];
                    case 5:
                        error_9 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_9
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //TODO: Generate appointment times for armyPlaces/ operations and everything else
    ArmyplacesService.prototype.updateArmyPlaceOperationDurations = function (armyPlaceId, newDuration) {
        return __awaiter(this, void 0, void 0, function () {
            var armyPlace_1, date, appointmens_1, error_10;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.armyPlaceRepo.findOne({
                                where: { id: +armyPlaceId },
                                relations: ['location', 'doctors']
                            })];
                    case 1:
                        armyPlace_1 = _a.sent();
                        if (armyPlace_1 === null) {
                            return [2 /*return*/, new common_1.InternalServerErrorException('ArmyPlace is null')];
                        }
                        if (armyPlace_1.shiftDuration === null) {
                            armyPlace_1.shiftDuration = 8;
                        }
                        if (armyPlace_1.appointmentTimes === null) {
                            armyPlace_1.appointmentTimes = [];
                        }
                        if (armyPlace_1.appointmentDates === null ||
                            armyPlace_1.appointmentDates.length < 1) {
                            armyPlace_1.appointmentDates = [];
                            date = new Date();
                            armyPlace_1.appointmentDates.push(date.getDate() +
                                '/' +
                                date.getMonth() +
                                '/' +
                                date.getFullYear() +
                                ' 08:00:00');
                            armyPlace_1.appointmentDates.push(date.getDate() +
                                1 +
                                '/' +
                                date.getMonth() +
                                '/' +
                                date.getFullYear() +
                                ' 14:00:00');
                        }
                        if (armyPlace_1.appointmentDurations === null ||
                            armyPlace_1.appointmentDurations.length < 1) {
                            armyPlace_1.appointmentDurations = [];
                            armyPlace_1.appointmentDurations.push('02:00');
                        }
                        armyPlace_1.duration = newDuration;
                        appointmens_1 = [];
                        armyPlace_1.appointmentDates.forEach(function (appointment) {
                            appointmens_1.push.apply(appointmens_1, _this.getTimes(appointment, newDuration, armyPlace_1.shiftDuration));
                        });
                        armyPlace_1.appointmentTimes = appointmens_1;
                        return [4 /*yield*/, armyPlace_1.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                armyPlace: armyPlace_1,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_UPDATED
                            }];
                    case 3:
                        error_10 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_10
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ArmyplacesService.prototype.updateArmyPlaceOperationDates = function (armyPlaceId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var armyPlace, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.armyPlaceRepo.findOne({
                                where: { id: +armyPlaceId },
                                relations: ['location', 'doctors']
                            })];
                    case 1:
                        armyPlace = _a.sent();
                        if (armyPlace === null) {
                            return [2 /*return*/, new common_1.InternalServerErrorException('ArmyPlace Entity is null')];
                        }
                        armyPlace.appointmentDates = this.getDaysList(startDate, endDate, armyPlace.appointmentDurations);
                        return [4 /*yield*/, armyPlace.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.updateArmyPlaceOperationDurations(armyPlaceId, armyPlace.duration)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_11 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_11
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ArmyplacesService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(armyplaces_entity_1.ArmyPlaceEntity)),
        __param(1, typeorm_1.InjectRepository(city_entity_1.CityEntity)),
        __param(2, typeorm_1.InjectRepository(doctor_entity_1.DoctorEntity))
    ], ArmyplacesService);
    return ArmyplacesService;
}());
exports.ArmyplacesService = ArmyplacesService;
