"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DoctorPlaceDTO = void 0;
var class_validator_1 = require("class-validator");
var DoctorPlaceDTO = /** @class */ (function () {
    function DoctorPlaceDTO() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], DoctorPlaceDTO.prototype, "nameEn");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], DoctorPlaceDTO.prototype, "nameAr");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], DoctorPlaceDTO.prototype, "phone");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], DoctorPlaceDTO.prototype, "email");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], DoctorPlaceDTO.prototype, "imageUrl");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], DoctorPlaceDTO.prototype, "type");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], DoctorPlaceDTO.prototype, "startTime");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], DoctorPlaceDTO.prototype, "endTime");
    __decorate([
        class_validator_1.IsBoolean()
    ], DoctorPlaceDTO.prototype, "isAvialable");
    __decorate([
        class_validator_1.IsArray()
    ], DoctorPlaceDTO.prototype, "insurances");
    __decorate([
        class_validator_1.IsArray()
    ], DoctorPlaceDTO.prototype, "holidays");
    __decorate([
        class_validator_1.IsString()
    ], DoctorPlaceDTO.prototype, "cityId");
    return DoctorPlaceDTO;
}());
exports.DoctorPlaceDTO = DoctorPlaceDTO;
