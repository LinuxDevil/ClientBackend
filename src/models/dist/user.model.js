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
exports.UpdateDoctorDTO = exports.UpdateUserDTO = exports.RegistrationDTO = exports.RegisterationOTP = exports.LoginOTP = exports.LoginDTO = void 0;
var class_validator_1 = require("class-validator");
var LoginDTO = /** @class */ (function () {
    function LoginDTO() {
    }
    __decorate([
        class_validator_1.IsEmail(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(4)
    ], LoginDTO.prototype, "email");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(4)
    ], LoginDTO.prototype, "password");
    return LoginDTO;
}());
exports.LoginDTO = LoginDTO;
var LoginOTP = /** @class */ (function () {
    function LoginOTP() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(9),
        class_validator_1.MaxLength(13)
    ], LoginOTP.prototype, "username");
    return LoginOTP;
}());
exports.LoginOTP = LoginOTP;
var RegisterationOTP = /** @class */ (function () {
    function RegisterationOTP() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(9),
        class_validator_1.MaxLength(13)
    ], RegisterationOTP.prototype, "username");
    return RegisterationOTP;
}());
exports.RegisterationOTP = RegisterationOTP;
var RegistrationDTO = /** @class */ (function (_super) {
    __extends(RegistrationDTO, _super);
    function RegistrationDTO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(4),
        class_validator_1.MaxLength(20)
    ], RegistrationDTO.prototype, "username");
    return RegistrationDTO;
}(LoginDTO));
exports.RegistrationDTO = RegistrationDTO;
var UpdateUserDTO = /** @class */ (function () {
    function UpdateUserDTO() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "name");
    __decorate([
        class_validator_1.IsEmail(),
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "email");
    __decorate([
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "image");
    __decorate([
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "bio");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "insuranceNumber");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "insuranceCompanyId");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "city");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "district");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "nickname");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateUserDTO.prototype, "nationalityId");
    return UpdateUserDTO;
}());
exports.UpdateUserDTO = UpdateUserDTO;
var UpdateDoctorDTO = /** @class */ (function () {
    function UpdateDoctorDTO() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateDoctorDTO.prototype, "name");
    __decorate([
        class_validator_1.IsEmail(),
        class_validator_1.IsOptional()
    ], UpdateDoctorDTO.prototype, "email");
    __decorate([
        class_validator_1.IsOptional()
    ], UpdateDoctorDTO.prototype, "image");
    __decorate([
        class_validator_1.IsOptional()
    ], UpdateDoctorDTO.prototype, "bio");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateDoctorDTO.prototype, "insuranceNumber");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateDoctorDTO.prototype, "insuranceCompanyId");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], UpdateDoctorDTO.prototype, "nationalityId");
    return UpdateDoctorDTO;
}());
exports.UpdateDoctorDTO = UpdateDoctorDTO;
