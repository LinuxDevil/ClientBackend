"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HospitalDTO = void 0;
var class_validator_1 = require("class-validator");
var HospitalDTO = /** @class */ (function () {
    function HospitalDTO() {
    }
    __decorate([
        class_validator_1.IsString()
    ], HospitalDTO.prototype, "nameEn");
    __decorate([
        class_validator_1.IsString()
    ], HospitalDTO.prototype, "nameAr");
    __decorate([
        class_validator_1.IsString()
    ], HospitalDTO.prototype, "phone");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsEmail()
    ], HospitalDTO.prototype, "email");
    __decorate([
        class_validator_1.IsString()
    ], HospitalDTO.prototype, "imageUrl");
    __decorate([
        class_validator_1.IsString()
    ], HospitalDTO.prototype, "type");
    __decorate([
        class_validator_1.IsString()
    ], HospitalDTO.prototype, "startTime");
    __decorate([
        class_validator_1.IsString()
    ], HospitalDTO.prototype, "endTime");
    __decorate([
        class_validator_1.IsBoolean()
    ], HospitalDTO.prototype, "isAvialable");
    __decorate([
        class_validator_1.IsArray()
    ], HospitalDTO.prototype, "insurances");
    __decorate([
        class_validator_1.IsArray()
    ], HospitalDTO.prototype, "holidays");
    __decorate([
        class_validator_1.IsString()
    ], HospitalDTO.prototype, "cityId");
    return HospitalDTO;
}());
exports.HospitalDTO = HospitalDTO;
