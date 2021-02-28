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
exports.HospitalEntity = void 0;
var typeorm_1 = require("typeorm");
var abstract_entities_1 = require("./abstract-entities");
var appointment_entity_1 = require("./appointment.entity");
var city_entity_1 = require("./city.entity");
var doctor_entity_1 = require("./doctor.entity");
var place_entity_1 = require("./place.entity");
var user_entity_1 = require("./user.entity");
var HospitalEntity = /** @class */ (function (_super) {
    __extends(HospitalEntity, _super);
    function HospitalEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HospitalEntity_1 = HospitalEntity;
    var HospitalEntity_1;
    __decorate([
        typeorm_1.Column()
    ], HospitalEntity.prototype, "nameEn");
    __decorate([
        typeorm_1.Column()
    ], HospitalEntity.prototype, "nameAr");
    __decorate([
        typeorm_1.Column()
    ], HospitalEntity.prototype, "phone");
    __decorate([
        typeorm_1.Column()
    ], HospitalEntity.prototype, "email");
    __decorate([
        typeorm_1.Column()
    ], HospitalEntity.prototype, "imageUrl");
    __decorate([
        typeorm_1.Column()
    ], HospitalEntity.prototype, "type");
    __decorate([
        typeorm_1.Column()
    ], HospitalEntity.prototype, "startTime");
    __decorate([
        typeorm_1.Column()
    ], HospitalEntity.prototype, "endTime");
    __decorate([
        typeorm_1.Column()
    ], HospitalEntity.prototype, "isAvialable");
    __decorate([
        typeorm_1.Column({ "default": 8, nullable: true })
    ], HospitalEntity.prototype, "shiftDuration");
    __decorate([
        typeorm_1.Column({ "default": '10', nullable: true })
    ], HospitalEntity.prototype, "duration");
    __decorate([
        typeorm_1.Column('text', { array: true, nullable: true })
    ], HospitalEntity.prototype, "appointmentTimes");
    __decorate([
        typeorm_1.Column('text', { array: true, nullable: true })
    ], HospitalEntity.prototype, "appointmentDurations");
    __decorate([
        typeorm_1.Column('text', { array: true, nullable: true })
    ], HospitalEntity.prototype, "appointmentDates");
    __decorate([
        typeorm_1.Column('text', { array: true })
    ], HospitalEntity.prototype, "insurances");
    __decorate([
        typeorm_1.Column('date', { array: true })
    ], HospitalEntity.prototype, "holidays");
    __decorate([
        typeorm_1.ManyToOne(function () { return city_entity_1.CityEntity; }, function (city) { return city.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn()
    ], HospitalEntity.prototype, "location");
    __decorate([
        typeorm_1.OneToMany(function () { return appointment_entity_1.AppointmentEntity; }, function (appointment) { return appointment.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinTable()
    ], HospitalEntity.prototype, "JoinColumn");
    __decorate([
        typeorm_1.OneToMany(function () { return place_entity_1.PlaceEntity; }, function (place) { return place.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn()
    ], HospitalEntity.prototype, "labs");
    __decorate([
        typeorm_1.OneToMany(function () { return place_entity_1.PlaceEntity; }, function (place) { return place.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn()
    ], HospitalEntity.prototype, "xrays");
    __decorate([
        typeorm_1.OneToMany(function () { return place_entity_1.PlaceEntity; }, function (place) { return place.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn()
    ], HospitalEntity.prototype, "pharmacies");
    __decorate([
        typeorm_1.OneToMany(function () { return doctor_entity_1.DoctorEntity; }, function (doctor) { return doctor.hospital; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn({ name: 'doctors' })
    ], HospitalEntity.prototype, "doctors");
    __decorate([
        typeorm_1.OneToMany(function () { return user_entity_1.UserEntity; }, function (user) { return user.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn()
    ], HospitalEntity.prototype, "user");
    __decorate([
        typeorm_1.OneToMany(function () { return HospitalEntity_1; }, function (hospital) { return hospital.id; }, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
        typeorm_1.JoinColumn()
    ], HospitalEntity.prototype, "subHospitals");
    __decorate([
        typeorm_1.ManyToOne(function () { return appointment_entity_1.AppointmentEntity; }, function (appointment) { return appointment.hospital; }),
        typeorm_1.JoinTable()
    ], HospitalEntity.prototype, "appointments");
    HospitalEntity = HospitalEntity_1 = __decorate([
        typeorm_1.Entity('hospital')
    ], HospitalEntity);
    return HospitalEntity;
}(abstract_entities_1.AbstractEntity));
exports.HospitalEntity = HospitalEntity;
