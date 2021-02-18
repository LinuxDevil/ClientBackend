"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var database_connection_service_1 = require("../services/database-connection.service");
var auth_module_1 = require("../modules/auth.module");
var user_module_1 = require("../modules/user.module");
var sms_service_1 = require("../services/sms.service");
var menuitems_module_1 = require("src/modules/menuitems.module");
var appointment_module_1 = require("src/modules/appointment.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forRootAsync({
                    useClass: database_connection_service_1.DatabaseConnectionService
                }), auth_module_1.AuthModule, user_module_1.UserModule, menuitems_module_1.MenuitemsModule, appointment_module_1.AppointmentModule],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService, sms_service_1.SmsService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
