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
var doctor_entity_1 = require("src/entities/doctor.entity");
var place_entity_1 = require("src/entities/place.entity");
var user_entity_1 = require("src/entities/user.entity");
var AppointmentService = /** @class */ (function () {
    function AppointmentService(appointmentRepo, doctorRepo, userRepo, placeRepo) {
        this.appointmentRepo = appointmentRepo;
        this.doctorRepo = doctorRepo;
        this.userRepo = userRepo;
        this.placeRepo = placeRepo;
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
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('findDoctorCalled');
                        return [4 /*yield*/, this.doctorRepo.findOne({ where: { username: username } })];
                    case 1: return [2 /*return*/, (_a.sent()).toProfile(doctor)];
                }
            });
        });
    };
    AppointmentService.prototype.addAppointment = function (appointment) {
        return __awaiter(this, void 0, void 0, function () {
            var doctor, user, place, appointmentEntity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doctorRepo.findOne({ where: { username: appointment.doctor } })];
                    case 1:
                        doctor = _a.sent();
                        return [4 /*yield*/, this.userRepo.findOne({ where: { username: appointment.user } })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.placeRepo.findOne({ where: { placeName: appointment.place } })];
                    case 3:
                        place = _a.sent();
                        appointmentEntity = new appointment_entity_1.AppointmentEntity();
                        appointmentEntity.user = user;
                        appointmentEntity.doctor = doctor;
                        appointmentEntity.place = place;
                        appointmentEntity.date = new Date(appointment.date);
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
                        return [2 /*return*/, appointmentEntity];
                }
            });
        });
    };
    AppointmentService.prototype.deleteAppointment = function (appointment) {
        return __awaiter(this, void 0, void 0, function () {
            var appointmentEntity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.appointmentRepo.findOne({ where: { id: appointment } })];
                    case 1:
                        appointmentEntity = _a.sent();
                        return [4 /*yield*/, this.appointmentRepo.remove(appointmentEntity)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AppointmentService.prototype.getUserAppointments = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.appointmentRepo.find({ where: { user: user.id } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AppointmentService.prototype.getAllDoctorsAppointments = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(user);
                        return [4 /*yield*/, this.appointmentRepo.find({ where: { doctor: user.id } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AppointmentService.prototype.getAllPlaceAppointments = function (place) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.appointmentRepo.find({ where: { place: place.id } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AppointmentService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(appointment_entity_1.AppointmentEntity)),
        __param(1, typeorm_1.InjectRepository(doctor_entity_1.DoctorEntity)),
        __param(2, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
        __param(3, typeorm_1.InjectRepository(place_entity_1.PlaceEntity))
    ], AppointmentService);
    return AppointmentService;
}());
exports.AppointmentService = AppointmentService;
