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
exports.AppointmentEntity = void 0;
var typeorm_1 = require("typeorm");
var abstract_entities_1 = require("./abstract-entities");
var doctor_entity_1 = require("./doctor.entity");
var hospital_entity_1 = require("./hospital.entity");
var place_entity_1 = require("./place.entity");
var user_entity_1 = require("./user.entity");
var AppointmentEntity = /** @class */ (function (_super) {
    __extends(AppointmentEntity, _super);
    function AppointmentEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column()
    ], AppointmentEntity.prototype, "date");
    __decorate([
        typeorm_1.Column()
    ], AppointmentEntity.prototype, "time");
    __decorate([
        typeorm_1.Column()
    ], AppointmentEntity.prototype, "location");
    __decorate([
        typeorm_1.Column({ "default": null, nullable: true })
    ], AppointmentEntity.prototype, "imageUrl");
    __decorate([
        typeorm_1.Column()
    ], AppointmentEntity.prototype, "rate");
    __decorate([
        typeorm_1.Column()
    ], AppointmentEntity.prototype, "inProgress");
    __decorate([
        typeorm_1.Column()
    ], AppointmentEntity.prototype, "shift");
    __decorate([
        typeorm_1.Column({ "default": '', nullable: true })
    ], AppointmentEntity.prototype, "tests");
    __decorate([
        typeorm_1.ManyToOne(function () { return doctor_entity_1.DoctorEntity; }, function (doctor) { return doctor.appointments; }, {
            onDelete: 'CASCADE'
        }),
        typeorm_1.JoinTable()
    ], AppointmentEntity.prototype, "doctor");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.UserEntity; }, function (user) { return user.appointments; }, {
            onDelete: 'CASCADE'
        }),
        typeorm_1.JoinTable()
    ], AppointmentEntity.prototype, "user");
    __decorate([
        typeorm_1.ManyToOne(function () { return hospital_entity_1.HospitalEntity; }, function (hospital) { return hospital.appointments; }, {
            onDelete: 'CASCADE'
        }),
        typeorm_1.JoinTable()
    ], AppointmentEntity.prototype, "hospital");
    __decorate([
        typeorm_1.ManyToOne(function () { return place_entity_1.PlaceEntity; }, function (place) { return place.id; }, {
            onDelete: 'CASCADE'
        }),
        typeorm_1.JoinTable()
    ], AppointmentEntity.prototype, "place");
    AppointmentEntity = __decorate([
        typeorm_1.Entity('appointment')
    ], AppointmentEntity);
    return AppointmentEntity;
}(abstract_entities_1.AbstractEntity));
exports.AppointmentEntity = AppointmentEntity;
