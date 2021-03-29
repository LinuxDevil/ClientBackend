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
exports.DoctorsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var doctor_entity_1 = require("src/entities/doctor.entity");
var insurance_entity_1 = require("src/entities/insurance.entity");
var Constants_1 = require("src/helpers/Constants");
require("../helpers/DateExt");
var DoctorsService = /** @class */ (function () {
    function DoctorsService(doctorRepo, insuranceRepo) {
        this.doctorRepo = doctorRepo;
        this.insuranceRepo = insuranceRepo;
    }
    DoctorsService.prototype.getAllDoctors = function () {
        return __awaiter(this, void 0, void 0, function () {
            var doctors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doctorRepo.find({
                            loadRelationIds: true
                        })];
                    case 1:
                        doctors = _a.sent();
                        return [2 /*return*/, { doctors: doctors }];
                }
            });
        });
    };
    DoctorsService.prototype.getDoctorById = function (doctorId) {
        return __awaiter(this, void 0, void 0, function () {
            var doctor, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepo.findOne({
                                where: { id: +doctorId },
                                loadRelationIds: true
                            })];
                    case 1:
                        doctor = _a.sent();
                        return [2 /*return*/, { doctor: doctor }];
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
    DoctorsService.prototype.getTimes = function (date, newDuration, shift) {
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
    DoctorsService.prototype.getDaysArray = function (start, end, timeToAdd) {
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
    DoctorsService.prototype.getDaysList = function (startDate, endDate, timeToAdd) {
        var daylist = this.getDaysArray(new Date(startDate), new Date(endDate), timeToAdd);
        daylist
            .map(function (v) {
            var thing = v.slice(0, 15);
            return thing;
        })
            .join('');
        return daylist;
    };
    DoctorsService.prototype.updateAppointmentDuration = function (upDoctor, newDuration) {
        return __awaiter(this, void 0, void 0, function () {
            var doctor_1, date, appointmens_1, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        doctor_1 = upDoctor;
                        if (doctor_1 === null) {
                            return [2 /*return*/, new common_1.InternalServerErrorException('Doctor Entity is null')];
                        }
                        if (doctor_1.shiftDuration === null) {
                            doctor_1.shiftDuration = 8;
                        }
                        if (doctor_1.appointmentTimes === null) {
                            doctor_1.appointmentTimes = [];
                        }
                        if (doctor_1.appointmentDates === null ||
                            doctor_1.appointmentDates.length < 1) {
                            doctor_1.appointmentDates = [];
                            date = new Date();
                            doctor_1.appointmentDates.push(date.getDate() +
                                '/' +
                                date.getMonth() +
                                '/' +
                                date.getFullYear() +
                                ' 08:00:00');
                            doctor_1.appointmentDates.push(date.getDate() +
                                1 +
                                '/' +
                                date.getMonth() +
                                '/' +
                                date.getFullYear() +
                                ' 14:00:00');
                        }
                        if (doctor_1.appointmentDurations === null ||
                            doctor_1.appointmentDurations.length < 1) {
                            doctor_1.appointmentDurations = [];
                            doctor_1.appointmentDurations.push('02:00');
                        }
                        doctor_1.duration = newDuration;
                        appointmens_1 = [];
                        doctor_1.appointmentDates.forEach(function (appointment) {
                            appointmens_1.push.apply(appointmens_1, _this.getTimes(appointment, newDuration, doctor_1.shiftDuration));
                        });
                        doctor_1.appointmentTimes = appointmens_1;
                        return [4 /*yield*/, doctor_1.save()];
                    case 1:
                        _a.sent();
                        upDoctor = doctor_1;
                        return [4 /*yield*/, upDoctor.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                doctor: upDoctor,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_UPDATED
                            }];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_2
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DoctorsService.prototype.updateDoctor = function (username, data) {
        return __awaiter(this, void 0, void 0, function () {
            var doctor, insurance, doctorUp, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.doctorRepo.findOne({
                                where: { username: '+'.concat(username) },
                                loadRelationIds: true
                            })];
                    case 1:
                        doctor = _a.sent();
                        if (doctor === undefined || doctor === null) {
                            return [2 /*return*/, {
                                    status: 0,
                                    message: 'There is no doctor with username' + username
                                }];
                        }
                        if (!data.insuranceCompanyId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.insuranceRepo.findOne({
                                where: { id: data.insuranceCompanyId },
                                loadRelationIds: true
                            })];
                    case 2:
                        insurance = _a.sent();
                        if (insurance === null || insurance === undefined) {
                            return [2 /*return*/, {
                                    status: 0,
                                    message: 'There is no insurance with id' + data.insuranceCompanyId
                                }];
                        }
                        doctor.insuranceCompany = insurance;
                        return [4 /*yield*/, doctor.save()];
                    case 3:
                        _a.sent();
                        delete data.insuranceCompanyId;
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.doctorRepo.update({ username: '+'.concat(username) }, data)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.doctorRepo.findOne({
                                where: { username: '+'.concat(username) }
                            })];
                    case 6:
                        doctorUp = _a.sent();
                        return [2 /*return*/, {
                                doctor: doctorUp,
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
    DoctorsService.prototype.updateAppointmentDates = function (upDoctor, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var doctor, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        doctor = upDoctor;
                        if (doctor === null) {
                            return [2 /*return*/, new common_1.InternalServerErrorException('Doctor Entity is null')];
                        }
                        doctor.appointmentDates = this.getDaysList(startDate, endDate, doctor.appointmentDurations);
                        return [4 /*yield*/, doctor.save()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.updateAppointmentDuration(doctor, doctor.duration)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, {
                                status: new Constants_1.Constants().PREMADE_STATUS.Fail_GET,
                                error: error_4
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DoctorsService.prototype.deleteDoctorById = function (doctorId) {
        return __awaiter(this, void 0, void 0, function () {
            var deleted, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doctorRepo["delete"]({ id: +doctorId })];
                    case 1:
                        deleted = _a.sent();
                        return [2 /*return*/, {
                                deleted: deleted,
                                status: new Constants_1.Constants().PREMADE_STATUS.SUCCESS_DELETED
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
    DoctorsService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(doctor_entity_1.DoctorEntity)),
        __param(1, typeorm_1.InjectRepository(insurance_entity_1.InsuranceCompanyEntity))
    ], DoctorsService);
    return DoctorsService;
}());
exports.DoctorsService = DoctorsService;
