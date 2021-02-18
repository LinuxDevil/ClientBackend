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
exports.__esModule = true;
exports.AppointmentController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var user_decorator_1 = require("src/decorators/user.decorator");
var AppointmentController = /** @class */ (function () {
    function AppointmentController(appointmentService) {
        this.appointmentService = appointmentService;
    }
    AppointmentController.prototype.findCurrentUser = function (_a) {
        var username = _a.username;
        return this.appointmentService.findUser(username);
    };
    AppointmentController.prototype.findCurrentDoctor = function (_a) {
        var username = _a.username;
        return this.appointmentService.findDoctor(username);
    };
    AppointmentController.prototype.createNewAppointment = function (user, data) {
        return this.appointmentService.addAppointment(data);
    };
    AppointmentController.prototype.deleteAppointment = function (appointmentId) {
        return this.appointmentService.deleteAppointment(appointmentId.appointmentId);
    };
    AppointmentController.prototype.getAppointmentsForUser = function (user) {
        return this.appointmentService.getUserAppointments(user);
    };
    AppointmentController.prototype.getAppointmentsForDoctor = function (doctor) {
        return this.appointmentService.getAllDoctorsAppointments(doctor);
    };
    AppointmentController.prototype.getAppointmentsForPlace = function (place) {
        return this.appointmentService.getAllPlaceAppointments(place);
    };
    __decorate([
        common_1.Get(),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, user_decorator_1.User())
    ], AppointmentController.prototype, "findCurrentUser");
    __decorate([
        common_1.Get(),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, user_decorator_1.Doctor())
    ], AppointmentController.prototype, "findCurrentDoctor");
    __decorate([
        common_1.Post(),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, user_decorator_1.User()), __param(1, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true })))
    ], AppointmentController.prototype, "createNewAppointment");
    __decorate([
        common_1.Delete('/delete'),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true })))
    ], AppointmentController.prototype, "deleteAppointment");
    __decorate([
        common_1.Post('/getUserAppointments'),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, user_decorator_1.User())
    ], AppointmentController.prototype, "getAppointmentsForUser");
    __decorate([
        common_1.Post('/getDoctorAppointments'),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, user_decorator_1.Doctor())
    ], AppointmentController.prototype, "getAppointmentsForDoctor");
    __decorate([
        common_1.Post('/getAllPlaceAppointments'),
        common_1.UseGuards(passport_1.AuthGuard()),
        __param(0, user_decorator_1.Place())
    ], AppointmentController.prototype, "getAppointmentsForPlace");
    AppointmentController = __decorate([
        common_1.Controller('appointment')
    ], AppointmentController);
    return AppointmentController;
}());
exports.AppointmentController = AppointmentController;
