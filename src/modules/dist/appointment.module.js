"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppointmentModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var appointment_controller_1 = require("src/controllers/appointments/appointment.controller");
var appointment_entity_1 = require("src/entities/appointment.entity");
var appointment_service_1 = require("src/services/appointment.service");
var auth_module_1 = require("./auth.module");
var menuitems_module_1 = require("./menuitems.module");
var user_entity_1 = require("src/entities/user.entity");
var doctor_entity_1 = require("src/entities/doctor.entity");
var place_entity_1 = require("src/entities/place.entity");
var menuitem_entity_1 = require("src/entities/menuitem.entity");
var menuitems_service_1 = require("src/services/menuitems.service");
var menuitems_controller_1 = require("src/controllers/menuitems/menuitems.controller");
var doctors_controller_1 = require("src/controllers/doctors/doctors.controller");
var doctors_service_1 = require("src/services/doctors.service");
var insurance_entity_1 = require("src/entities/insurance.entity");
var insurance_service_1 = require("src/services/insurance/insurance.service");
var insurance_controller_1 = require("src/controllers/insurance/insurance.controller");
var hospital_entity_1 = require("src/entities/hospital.entity");
var hospitals_controller_1 = require("src/controllers/hospitals/hospitals.controller");
var hospitals_service_1 = require("src/services/hospitals/hospitals.service");
var city_entity_1 = require("src/entities/city.entity");
var cities_service_1 = require("src/services/cities.service");
var cities_controller_1 = require("src/controllers/cities/cities.controller");
var AppointmentModule = /** @class */ (function () {
    function AppointmentModule() {
    }
    AppointmentModule = __decorate([
        common_1.Module({
            imports: [
                menuitems_module_1.MenuitemsModule,
                typeorm_1.TypeOrmModule.forFeature([insurance_entity_1.InsuranceCompanyEntity, appointment_entity_1.AppointmentEntity, user_entity_1.UserEntity, doctor_entity_1.DoctorEntity, place_entity_1.PlaceEntity, menuitem_entity_1.MenuItem, hospital_entity_1.HospitalEntity, city_entity_1.CityEntity]),
                auth_module_1.AuthModule
            ],
            providers: [insurance_service_1.InsuranceService, appointment_service_1.AppointmentService, menuitems_service_1.MenuitemsService, doctors_service_1.DoctorsService, hospitals_service_1.HospitalsService, cities_service_1.CitiesService],
            controllers: [insurance_controller_1.InsuranceController, appointment_controller_1.AppointmentController, menuitems_controller_1.MenuitemsController, doctors_controller_1.DoctorsController, hospitals_controller_1.HospitalsController, cities_controller_1.CitiesController],
            exports: [appointment_service_1.AppointmentService, menuitems_service_1.MenuitemsService, doctors_service_1.DoctorsService]
        })
    ], AppointmentModule);
    return AppointmentModule;
}());
exports.AppointmentModule = AppointmentModule;
