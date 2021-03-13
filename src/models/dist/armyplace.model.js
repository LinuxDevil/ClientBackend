"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArmyPlaceDTO = void 0;
var class_validator_1 = require("class-validator");
var ArmyPlaceDTO = /** @class */ (function () {
    function ArmyPlaceDTO() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], ArmyPlaceDTO.prototype, "nameEn");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], ArmyPlaceDTO.prototype, "nameAr");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], ArmyPlaceDTO.prototype, "phone");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], ArmyPlaceDTO.prototype, "email");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], ArmyPlaceDTO.prototype, "imageUrl");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], ArmyPlaceDTO.prototype, "type");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], ArmyPlaceDTO.prototype, "startTime");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], ArmyPlaceDTO.prototype, "endTime");
    __decorate([
        class_validator_1.IsBoolean()
    ], ArmyPlaceDTO.prototype, "isAvialable");
    __decorate([
        class_validator_1.IsArray()
    ], ArmyPlaceDTO.prototype, "insurances");
    __decorate([
        class_validator_1.IsArray()
    ], ArmyPlaceDTO.prototype, "holidays");
    __decorate([
        class_validator_1.IsString()
    ], ArmyPlaceDTO.prototype, "cityId");
    return ArmyPlaceDTO;
}());
exports.ArmyPlaceDTO = ArmyPlaceDTO;
