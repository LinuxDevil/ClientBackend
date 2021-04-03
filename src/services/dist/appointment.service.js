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
exports.AppointmentService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var appointment_entity_1 = require("src/entities/appointment.entity");
var armyplaces_entity_1 = require("src/entities/armyplaces.entity");
var doctor_entity_1 = require("src/entities/doctor.entity");
var doctorplace_entity_1 = require("src/entities/doctorplace.entity");
var hospital_entity_1 = require("src/entities/hospital.entity");
var place_entity_1 = require("src/entities/place.entity");
var user_entity_1 = require("src/entities/user.entity");
var Constants_1 = require("src/helpers/Constants");
var AppointmentService = /** @class */ (function () {
    function AppointmentService(appointmentRepo, doctorRepo, userRepo, placeRepo, hospitalRepo, doctorPlaceRepo, armyPlaceRepo) {
        this.appointmentRepo = appointmentRepo;
        this.doctorRepo = doctorRepo;
        this.userRepo = userRepo;
        this.placeRepo = placeRepo;
        this.hospitalRepo = hospitalRepo;
        this.doctorPlaceRepo = doctorPlaceRepo;
        this.armyPlaceRepo = armyPlaceRepo;
    }
    AppointmentService.prototype.findUser = function (username, user) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('findUser');
                        return [4 /*yield*/, this.userRepo.findOne({ where: { username: username } })];
                    case 1: return [2 /*return*/, (_a.sent()).toProfile(user)];
                }
            });
        });
    };
    AppointmentService.prototype.findDoctor = function (username, doctor) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepo.findOne({ where: { username: username } })];
                    case 1: return [2 /*return*/, (_a.sent()).toProfile(doctor)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_1
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentService.prototype.addAppointment = function (appointment) {
        return __awaiter(this, void 0, void 0, function () {
            var doctor, user, place, appointmentEntity, index, date, convertedDate, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.doctorRepo.findOne({
                                where: { username: appointment.doctor }
                            })];
                    case 1:
                        doctor = _a.sent();
                        return [4 /*yield*/, this.userRepo.findOne({
                                where: { username: appointment.user }
                            })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.placeRepo.findOne({
                                where: { nameEn: appointment.place }
                            })];
                    case 3:
                        place = _a.sent();
                        appointmentEntity = new appointment_entity_1.AppointmentEntity();
                        appointmentEntity.user = user;
                        index = doctor.appointmentTimes.indexOf(appointment.time);
                        if (index === -1) {
                            return [2 /*return*/, {
                                    status: 0,
                                    message: 'there was no time'
                                }];
                        }
                        doctor.appointmentTimes.splice(index, 1);
                        return [4 /*yield*/, doctor.save()];
                    case 4:
                        _a.sent();
                        appointmentEntity.doctor = doctor;
                        appointmentEntity.place = place;
                        date = appointment.date.split('/');
                        convertedDate = date[1] + '/' + date[0] + '/' + date[2];
                        appointmentEntity.date = new Date(convertedDate);
                        appointmentEntity.time = appointment.time;
                        appointmentEntity.rate = 0;
                        appointmentEntity.location = appointment.location;
                        appointmentEntity.inProgress = true;
                        appointmentEntity.shift = appointment.shift;
                        return [4 /*yield*/, this.appointmentRepo.create(appointmentEntity)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, appointmentEntity.save()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, {
                                appointmentEntity: appointmentEntity,
                                status: new Constants_1.Constants().PREMADE_STATUS.Success_Created
                            }];
                    case 7:
                        error_2 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_2
                            }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * when the user clicks on add appointment.
     * External for example, he get's an appointment inside the hospital.
     * So here, update the hospital appointemnts to that, with the corresponding type.
     */
    AppointmentService.prototype.addHospitalAppointment = function (appointment) {
        return __awaiter(this, void 0, void 0, function () {
            var hospital, user, place, appointmentEntity, index, date, convertedDate, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.hospitalRepo.findOne({
                                where: { id: +appointment.hospitalId },
                                relations: ['location', 'doctors']
                            })];
                    case 1:
                        hospital = _a.sent();
                        return [4 /*yield*/, this.userRepo.findOne({
                                where: { username: appointment.user }
                            })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.placeRepo.findOne({
                                where: { nameEn: appointment.place }
                            })];
                    case 3:
                        place = _a.sent();
                        appointmentEntity = new appointment_entity_1.AppointmentEntity();
                        appointmentEntity.user = user;
                        index = hospital.appointmentTimes.indexOf(appointment.time);
                        if (index === -1) {
                            return [2 /*return*/, {
                                    status: new Constants_1.Constants().PREMADE_STATUS.Fail_Created,
                                    message: 'there was no time'
                                }];
                        }
                        hospital.appointmentTimes.splice(index, 1);
                        return [4 /*yield*/, hospital.save()];
                    case 4:
                        _a.sent();
                        appointmentEntity.hospital = hospital;
                        appointmentEntity.place = place;
                        date = appointment.date.split('/');
                        convertedDate = date[1] + '/' + date[0] + '/' + date[2];
                        appointmentEntity.date = new Date(convertedDate);
                        appointmentEntity.time = appointment.time;
                        appointmentEntity.rate = 0;
                        appointmentEntity.location = appointment.location;
                        appointmentEntity.inProgress = true;
                        appointmentEntity.shift = appointment.shift;
                        return [4 /*yield*/, this.appointmentRepo.create(appointmentEntity)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, appointmentEntity.save()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, {
                                appointmentEntity: appointmentEntity,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_UPDATED
                            }];
                    case 7:
                        error_3 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_3
                            }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentService.prototype.addPlacesAppointment = function (appointment) {
        return __awaiter(this, void 0, void 0, function () {
            var user, place, appointmentEntity, index, date, convertedDate, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.userRepo.findOne({
                                where: { username: appointment.user }
                            })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.placeRepo.findOne({
                                where: { id: +appointment.place }
                            })];
                    case 2:
                        place = _a.sent();
                        appointmentEntity = new appointment_entity_1.AppointmentEntity();
                        appointmentEntity.user = user;
                        index = place.appointmentTimes.indexOf(appointment.time);
                        if (index === -1) {
                            return [2 /*return*/, {
                                    status: new Constants_1.Constants().PREMADE_STATUS.Fail_Created,
                                    message: 'there was no time'
                                }];
                        }
                        place.appointmentTimes.splice(index, 1);
                        return [4 /*yield*/, place.save()];
                    case 3:
                        _a.sent();
                        appointmentEntity.place = place;
                        date = appointment.date.split('/');
                        convertedDate = date[1] + '/' + date[0] + '/' + date[2];
                        appointmentEntity.date = new Date(convertedDate);
                        appointmentEntity.time = appointment.time;
                        appointmentEntity.rate = 0;
                        appointmentEntity.location = appointment.location;
                        appointmentEntity.inProgress = true;
                        appointmentEntity.shift = appointment.shift;
                        return [4 /*yield*/, this.appointmentRepo.create(appointmentEntity)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, appointmentEntity.save()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, {
                                appointmentEntity: appointmentEntity,
                                status: new Constants_1.Constants().PREMADE_STATUS.Success_Created
                            }];
                    case 6:
                        error_4 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_4
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentService.prototype.addDoctorPlaceAppointment = function (appointment) {
        return __awaiter(this, void 0, void 0, function () {
            var doctorPlacce, user, appointmentEntity, index, date, convertedDate, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.doctorPlaceRepo.findOne({
                                where: { id: +appointment.place }
                            })];
                    case 1:
                        doctorPlacce = _a.sent();
                        return [4 /*yield*/, this.userRepo.findOne({
                                where: { username: appointment.user }
                            })];
                    case 2:
                        user = _a.sent();
                        appointmentEntity = new appointment_entity_1.AppointmentEntity();
                        appointmentEntity.user = user;
                        index = doctorPlacce.appointmentTimes.indexOf(appointment.time);
                        if (index === -1) {
                            return [2 /*return*/, {
                                    status: 0,
                                    message: new Constants_1.Constants().PREMADE_STATUS.Fail_Created
                                }];
                        }
                        doctorPlacce.appointmentTimes.splice(index, 1);
                        return [4 /*yield*/, doctorPlacce.save()];
                    case 3:
                        _a.sent();
                        appointmentEntity.doctorPlaces = doctorPlacce;
                        date = appointment.date.split('/');
                        convertedDate = date[1] + '/' + date[0] + '/' + date[2];
                        appointmentEntity.date = new Date(convertedDate);
                        appointmentEntity.time = appointment.time;
                        appointmentEntity.rate = 0;
                        appointmentEntity.location = appointment.location;
                        appointmentEntity.inProgress = true;
                        appointmentEntity.shift = appointment.shift;
                        return [4 /*yield*/, this.appointmentRepo.create(appointmentEntity)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, appointmentEntity.save()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, {
                                appointmentEntity: appointmentEntity,
                                status: new Constants_1.Constants().PREMADE_STATUS.Success_Created
                            }];
                    case 6:
                        error_5 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_5
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentService.prototype.addArmyPlaceAppointment = function (appointment) {
        return __awaiter(this, void 0, void 0, function () {
            var armyPlace, user, appointmentEntity, index, date, convertedDate, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.armyPlaceRepo.findOne({
                                where: { id: +appointment.place }
                            })];
                    case 1:
                        armyPlace = _a.sent();
                        return [4 /*yield*/, this.userRepo.findOne({
                                where: { username: appointment.user }
                            })];
                    case 2:
                        user = _a.sent();
                        appointmentEntity = new appointment_entity_1.AppointmentEntity();
                        appointmentEntity.user = user;
                        index = armyPlace.appointmentTimes.indexOf(appointment.time);
                        if (index === -1) {
                            return [2 /*return*/, {
                                    status: 0,
                                    message: 'there was no time'
                                }];
                        }
                        armyPlace.appointmentTimes.splice(index, 1);
                        return [4 /*yield*/, armyPlace.save()];
                    case 3:
                        _a.sent();
                        appointmentEntity.armyPlaces = armyPlace;
                        date = appointment.date.split('/');
                        convertedDate = date[1] + '/' + date[0] + '/' + date[2];
                        appointmentEntity.date = new Date(convertedDate);
                        appointmentEntity.time = appointment.time;
                        appointmentEntity.rate = 0;
                        appointmentEntity.location = appointment.location;
                        appointmentEntity.inProgress = true;
                        appointmentEntity.shift = appointment.shift;
                        return [4 /*yield*/, this.appointmentRepo.create(appointmentEntity)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, appointmentEntity.save()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, {
                                appointmentEntity: appointmentEntity,
                                status: new Constants_1.Constants().PREMADE_STATUS.Success_Created
                            }];
                    case 6:
                        error_6 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_6
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentService.prototype.deleteAppointment = function (appointment) {
        return __awaiter(this, void 0, void 0, function () {
            var appointmentEntity, deleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.appointmentRepo.findOne({
                            where: { id: appointment }
                        })];
                    case 1:
                        appointmentEntity = _a.sent();
                        return [4 /*yield*/, this.appointmentRepo.remove(appointmentEntity)];
                    case 2:
                        deleted = _a.sent();
                        return [2 /*return*/, {
                                deleted: deleted,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_DELETED
                            }];
                }
            });
        });
    };
    AppointmentService.prototype.getUserAppointments = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userAppointments, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.appointmentRepo.find({
                                where: { user: user.id }
                            })];
                    case 1:
                        userAppointments = _a.sent();
                        return [2 /*return*/, {
                                userAppointments: userAppointments,
                                length: userAppointments.length,
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
    AppointmentService.prototype.getAllDoctorsAppointments = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var doctorAppointments, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.appointmentRepo.find({
                                where: { doctor: user.id }
                            })];
                    case 1:
                        doctorAppointments = _a.sent();
                        return [2 /*return*/, {
                                doctorAppointments: doctorAppointments,
                                length: doctorAppointments.length,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_GET
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
    AppointmentService.prototype.getAllPlaceAppointments = function (place) {
        return __awaiter(this, void 0, void 0, function () {
            var placeAppointments, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.appointmentRepo.find({
                                where: { place: place.id }
                            })];
                    case 1:
                        placeAppointments = _a.sent();
                        return [2 /*return*/, {
                                placeAppointments: placeAppointments,
                                length: placeAppointments.length,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_GET
                            }];
                    case 2:
                        error_9 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_9
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(appointment_entity_1.AppointmentEntity)),
        __param(1, typeorm_1.InjectRepository(doctor_entity_1.DoctorEntity)),
        __param(2, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
        __param(3, typeorm_1.InjectRepository(place_entity_1.PlaceEntity)),
        __param(4, typeorm_1.InjectRepository(hospital_entity_1.HospitalEntity)),
        __param(5, typeorm_1.InjectRepository(doctorplace_entity_1.DoctorPlaceEntity)),
        __param(6, typeorm_1.InjectRepository(armyplaces_entity_1.ArmyPlaceEntity))
    ], AppointmentService);
    return AppointmentService;
}());
exports.AppointmentService = AppointmentService;
