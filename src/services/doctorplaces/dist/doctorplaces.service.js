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
exports.DoctorplacesService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var city_entity_1 = require("src/entities/city.entity");
var doctor_entity_1 = require("src/entities/doctor.entity");
var doctorplace_entity_1 = require("src/entities/doctorplace.entity");
var DoctorplacesService = /** @class */ (function () {
    function DoctorplacesService(doctorPlaceRepo, cityRepository, doctorRepo) {
        this.doctorPlaceRepo = doctorPlaceRepo;
        this.cityRepository = cityRepository;
        this.doctorRepo = doctorRepo;
    }
    DoctorplacesService.prototype.getTimes = function (date, newDuration, shift) {
        var quarterHours = ["00"];
        if (newDuration === "0") {
            quarterHours = ["00", "15", "30", "45"];
        }
        else {
            var oldValue = +newDuration;
            while (newDuration < 60) {
                quarterHours.push(newDuration);
                newDuration = +newDuration + oldValue;
            }
        }
        var times = [];
        var appointmentStartTime = Number.parseInt(date.split(" ")[1]);
        for (var i = appointmentStartTime; i < appointmentStartTime + shift; i++) {
            for (var j = 0; j < quarterHours.length; j++) {
                var time = i + ":" + quarterHours[j];
                if (i < 10) {
                    time = "0" + time;
                }
                times.push(date.split(" ")[0] + " " + time);
            }
        }
        return times;
    };
    DoctorplacesService.prototype.getDaysArray = function (start, end, timeToAdd) {
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt).getDate() + "/" + (new Date(dt).getMonth() + 1) + "/" + new Date(dt).getFullYear() + " " + timeToAdd);
        }
        return arr;
    };
    ;
    DoctorplacesService.prototype.getDaysList = function (startDate, endDate, timeToAdd) {
        var daylist = this.getDaysArray(new Date(startDate), new Date(endDate), timeToAdd);
        daylist.map(function (v) {
            var thing = v.slice(0, 15);
            return thing;
        }).join("");
        return daylist;
    };
    //Create new doctorPlace
    DoctorplacesService.prototype.createNewDoctorPlace = function (doctorPlace) {
        return __awaiter(this, void 0, void 0, function () {
            var city, doctorPlaceEntity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (doctorPlace === null) {
                            return [2 /*return*/, new Error("Invalid input")];
                        }
                        return [4 /*yield*/, this.cityRepository.findOne({ where: { id: doctorPlace.cityId } })];
                    case 1:
                        city = _a.sent();
                        if (city === null)
                            return [2 /*return*/, new Error("City id is not found")];
                        return [4 /*yield*/, this.doctorPlaceRepo.create(doctorPlace)];
                    case 2:
                        doctorPlaceEntity = _a.sent();
                        doctorPlaceEntity.location = city;
                        return [4 /*yield*/, doctorPlaceEntity.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { doctorPlaceEntity: doctorPlaceEntity }];
                }
            });
        });
    };
    //Get all general doctorPlaces
    DoctorplacesService.prototype.getAllGeneralDoctorPlaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var doctorPlaces;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doctorPlaceRepo.find()];
                    case 1:
                        doctorPlaces = _a.sent();
                        return [2 /*return*/, { doctorPlaces: doctorPlaces }];
                }
            });
        });
    };
    //Get all private doctorPlaces
    DoctorplacesService.prototype.getAllPrivateDoctorPlaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var doctorPlaces;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doctorPlaceRepo.find({ where: { type: "private" }, relations: ['location', 'doctors'] })];
                    case 1:
                        doctorPlaces = _a.sent();
                        return [2 /*return*/, { doctorPlaces: doctorPlaces }];
                }
            });
        });
    };
    //Get all private doctorPlaces
    DoctorplacesService.prototype.getAllFilteredPrivateDoctorPlaces = function (cityId) {
        return __awaiter(this, void 0, void 0, function () {
            var doctorPlaces;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doctorPlaceRepo.find({ where: { type: "private", location: { id: +cityId } }, relations: ['location', 'doctors'] })];
                    case 1:
                        doctorPlaces = _a.sent();
                        return [2 /*return*/, { doctorPlaces: doctorPlaces }];
                }
            });
        });
    };
    //Get all private doctorPlaces
    DoctorplacesService.prototype.getAllFilteredGeneralDoctorPlaces = function (cityId) {
        return __awaiter(this, void 0, void 0, function () {
            var doctorPlaces;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doctorPlaceRepo.find({ where: { type: "general", location: { id: +cityId } }, relations: ['location', 'doctors'] })];
                    case 1:
                        doctorPlaces = _a.sent();
                        return [2 /*return*/, { doctorPlaces: doctorPlaces }];
                }
            });
        });
    };
    //Get doctorPlace by id
    DoctorplacesService.prototype.getDoctorPlaceById = function (doctorPlaceId) {
        return __awaiter(this, void 0, void 0, function () {
            var doctorPlace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doctorPlaceRepo.findOne({ where: { id: +doctorPlaceId } })];
                    case 1:
                        doctorPlace = _a.sent();
                        if (doctorPlace == null) {
                            return [2 /*return*/, {
                                    status: 0,
                                    message: "There is no doctorPlace with id " + doctorPlaceId
                                }];
                        }
                        return [2 /*return*/, { doctorPlace: doctorPlace }];
                }
            });
        });
    };
    DoctorplacesService.prototype.deleteDoctorPlace = function (doctorPlaceId) {
        return __awaiter(this, void 0, void 0, function () {
            var doctorPlace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doctorPlaceRepo.findOne({ where: { id: +doctorPlaceId } })];
                    case 1:
                        doctorPlace = _a.sent();
                        console.log(doctorPlace);
                        if (doctorPlace === null || doctorPlace === undefined)
                            return [2 /*return*/, {
                                    status: 0,
                                    message: "DoctorPlace not found"
                                }];
                        return [4 /*yield*/, doctorPlace.remove()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DoctorplacesService.prototype.deleteAllDoctorPlaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doctorPlaceRepo["delete"]({ type: 'private' })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //TODO:: Add place to doctorPlace
    DoctorplacesService.prototype.addPlace = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    //TODO: Add doctor to doctorPlace
    DoctorplacesService.prototype.addDoctor = function (doctorId, doctorPlaceId) {
        return __awaiter(this, void 0, void 0, function () {
            var doctorPlace, doctor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doctorPlaceRepo.findOne({ where: { id: +doctorPlaceId } })];
                    case 1:
                        doctorPlace = _a.sent();
                        if (doctorPlace === null || doctorPlace === undefined) {
                            return [2 /*return*/, {
                                    message: "There's no doctorPlace with that id",
                                    status: 0
                                }];
                        }
                        return [4 /*yield*/, this.doctorRepo.findOne({ where: { id: +doctorId } })];
                    case 2:
                        doctor = _a.sent();
                        if (doctor === null || doctor === undefined) {
                            return [2 /*return*/, {
                                    message: "There's no doctor with that id",
                                    status: 0
                                }];
                        }
                        if (doctorPlace.doctors === undefined || doctorPlace.doctors === null) {
                            doctorPlace.doctors = [];
                        }
                        return [4 /*yield*/, doctorPlace.doctors.push(doctor)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, doctorPlace.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, { doctorPlace: doctorPlace }];
                }
            });
        });
    };
    //TODO: Generate appointment times for doctorPlaces/ operations and everything else
    DoctorplacesService.prototype.updateDoctorPlaceOperationDurations = function (doctorPlaceId, newDuration) {
        return __awaiter(this, void 0, void 0, function () {
            var doctorPlace, date, appointmens;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doctorPlaceRepo.findOne({ where: { id: +doctorPlaceId } })];
                    case 1:
                        doctorPlace = _a.sent();
                        if (doctorPlace === null) {
                            return [2 /*return*/, new common_1.InternalServerErrorException("DoctorPlace is null")];
                        }
                        if (doctorPlace.shiftDuration === null) {
                            doctorPlace.shiftDuration = 8;
                        }
                        if (doctorPlace.appointmentTimes === null) {
                            doctorPlace.appointmentTimes = [];
                        }
                        if (doctorPlace.appointmentDates === null || doctorPlace.appointmentDates.length < 1) {
                            doctorPlace.appointmentDates = [];
                            date = new Date();
                            doctorPlace.appointmentDates.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " 08:00:00");
                            doctorPlace.appointmentDates.push((date.getDate() + 1) + "/" + date.getMonth() + "/" + date.getFullYear() + " 14:00:00");
                        }
                        if (doctorPlace.appointmentDurations === null || doctorPlace.appointmentDurations.length < 1) {
                            doctorPlace.appointmentDurations = [];
                            doctorPlace.appointmentDurations.push("02:00");
                        }
                        doctorPlace.duration = newDuration;
                        appointmens = [];
                        doctorPlace.appointmentDates.forEach(function (appointment) {
                            appointmens.push.apply(appointmens, _this.getTimes(appointment, newDuration, doctorPlace.shiftDuration));
                        });
                        doctorPlace.appointmentTimes = appointmens;
                        return [4 /*yield*/, doctorPlace.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { doctorPlace: doctorPlace }];
                }
            });
        });
    };
    DoctorplacesService.prototype.updateDoctorPlaceOperationDates = function (doctorPlaceId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var doctorPlace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doctorPlaceRepo.findOne({ where: { id: +doctorPlaceId } })];
                    case 1:
                        doctorPlace = _a.sent();
                        if (doctorPlace === null) {
                            return [2 /*return*/, new common_1.InternalServerErrorException("DoctorPlace Entity is null")];
                        }
                        doctorPlace.appointmentDates = this.getDaysList(startDate, endDate, doctorPlace.appointmentDurations);
                        return [4 /*yield*/, doctorPlace.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.updateDoctorPlaceOperationDurations(doctorPlaceId, doctorPlace.duration)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DoctorplacesService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(doctorplace_entity_1.DoctorPlaceEntity)),
        __param(1, typeorm_1.InjectRepository(city_entity_1.CityEntity)),
        __param(2, typeorm_1.InjectRepository(doctor_entity_1.DoctorEntity))
    ], DoctorplacesService);
    return DoctorplacesService;
}());
exports.DoctorplacesService = DoctorplacesService;
