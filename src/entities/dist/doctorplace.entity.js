"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DoctorPlaceEntity = void 0;
var typeorm_1 = require("typeorm");
var abstract_entities_1 = require("./abstract-entities");
var appointment_entity_1 = require("./appointment.entity");
var city_entity_1 = require("./city.entity");
var doctor_entity_1 = require("./doctor.entity");
var hospital_entity_1 = require("./hospital.entity");
var place_entity_1 = require("./place.entity");
var user_entity_1 = require("./user.entity");
var DoctorPlaceEntity = /** @class */ (function (_super) {
    __extends(DoctorPlaceEntity, _super);
    function DoctorPlaceEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column()
    ], DoctorPlaceEntity.prototype, "nameEn");
    __decorate([
        typeorm_1.Column()
    ], DoctorPlaceEntity.prototype, "nameAr");
    __decorate([
        typeorm_1.Column()
    ], DoctorPlaceEntity.prototype, "phone");
    __decorate([
        typeorm_1.Column()
    ], DoctorPlaceEntity.prototype, "email");
    __decorate([
        typeorm_1.Column()
    ], DoctorPlaceEntity.prototype, "imageUrl");
    __decorate([
        typeorm_1.Column()
    ], DoctorPlaceEntity.prototype, "type");
    __decorate([
        typeorm_1.Column()
    ], DoctorPlaceEntity.prototype, "startTime");
    __decorate([
        typeorm_1.Column()
    ], DoctorPlaceEntity.prototype, "endTime");
    __decorate([
        typeorm_1.Column()
    ], DoctorPlaceEntity.prototype, "isAvialable");
    __decorate([
        typeorm_1.Column({ "default": 8, nullable: true })
    ], DoctorPlaceEntity.prototype, "shiftDuration");
    __decorate([
        typeorm_1.Column({ "default": '10', nullable: true })
    ], DoctorPlaceEntity.prototype, "duration");
    __decorate([
        typeorm_1.Column('text', { array: true, nullable: true })
    ], DoctorPlaceEntity.prototype, "appointmentTimes");
    __decorate([
        typeorm_1.Column('text', { array: true, nullable: true })
    ], DoctorPlaceEntity.prototype, "appointmentDurations");
    __decorate([
        typeorm_1.Column('text', { array: true, nullable: true })
    ], DoctorPlaceEntity.prototype, "appointmentDates");
    __decorate([
        typeorm_1.Column('text', { array: true })
    ], DoctorPlaceEntity.prototype, "insurances");
    __decorate([
        typeorm_1.Column('date', { array: true })
    ], DoctorPlaceEntity.prototype, "holidays");
    __decorate([
        typeorm_1.ManyToOne(function () { return city_entity_1.CityEntity; }, function (city) { return city.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn()
    ], DoctorPlaceEntity.prototype, "location");
    __decorate([
        typeorm_1.OneToMany(function () { return appointment_entity_1.AppointmentEntity; }, function (appointment) { return appointment.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinTable()
    ], DoctorPlaceEntity.prototype, "JoinColumn");
    __decorate([
        typeorm_1.OneToMany(function () { return place_entity_1.PlaceEntity; }, function (place) { return place.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn()
    ], DoctorPlaceEntity.prototype, "labs");
    __decorate([
        typeorm_1.OneToMany(function () { return place_entity_1.PlaceEntity; }, function (place) { return place.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn()
    ], DoctorPlaceEntity.prototype, "xrays");
    __decorate([
        typeorm_1.OneToMany(function () { return place_entity_1.PlaceEntity; }, function (place) { return place.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn()
    ], DoctorPlaceEntity.prototype, "pharmacies");
    __decorate([
        typeorm_1.OneToMany(function () { return doctor_entity_1.DoctorEntity; }, function (doctor) { return doctor.hospital; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn({ name: 'doctors' })
    ], DoctorPlaceEntity.prototype, "doctors");
    __decorate([
        typeorm_1.OneToMany(function () { return user_entity_1.UserEntity; }, function (user) { return user.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn()
    ], DoctorPlaceEntity.prototype, "user");
    __decorate([
        typeorm_1.OneToMany(function () { return hospital_entity_1.HospitalEntity; }, function (hospital) { return hospital.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn()
    ], DoctorPlaceEntity.prototype, "subHospitals");
    __decorate([
        typeorm_1.ManyToOne(function () { return appointment_entity_1.AppointmentEntity; }, function (appointment) { return appointment.hospital; }),
        typeorm_1.JoinTable()
    ], DoctorPlaceEntity.prototype, "appointments");
    DoctorPlaceEntity = __decorate([
        typeorm_1.Entity('doctorplace')
    ], DoctorPlaceEntity);
    return DoctorPlaceEntity;
}(abstract_entities_1.AbstractEntity));
exports.DoctorPlaceEntity = DoctorPlaceEntity;
