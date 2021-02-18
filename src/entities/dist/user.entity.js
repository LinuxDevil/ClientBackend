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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserEntity = void 0;
var typeorm_1 = require("typeorm");
var abstract_entities_1 = require("./abstract-entities");
var class_transformer_1 = require("class-transformer");
var bcrypt = require("bcryptjs");
var appointment_entity_1 = require("./appointment.entity");
var insurance_entity_1 = require("./insurance.entity");
var UserEntity = /** @class */ (function (_super) {
    __extends(UserEntity, _super);
    function UserEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserEntity_1 = UserEntity;
    UserEntity.prototype.hashPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, bcrypt.hash(this.password, 10)];
                    case 1:
                        _a.password = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserEntity.prototype.comparePassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.compare(password, this.password)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserEntity.prototype.toProfile = function (user) {
        var following = null;
        if (user) {
            following = this.followers.includes(user);
        }
        var profile = this.toJSON();
        delete profile.followers;
        return __assign(__assign({}, profile), { following: following });
    };
    UserEntity.prototype.toJSON = function () {
        return class_transformer_1.classToPlain(this);
    };
    var UserEntity_1;
    __decorate([
        typeorm_1.Column()
    ], UserEntity.prototype, "email");
    __decorate([
        typeorm_1.Column({ "default": '', nullable: true })
    ], UserEntity.prototype, "nickname");
    __decorate([
        typeorm_1.Column({ "default": '', nullable: true })
    ], UserEntity.prototype, "nationalityId");
    __decorate([
        typeorm_1.Column({ unique: true })
    ], UserEntity.prototype, "username");
    __decorate([
        typeorm_1.Column({ "default": '' })
    ], UserEntity.prototype, "name");
    __decorate([
        typeorm_1.Column({ "default": 'Amman' })
    ], UserEntity.prototype, "city");
    __decorate([
        typeorm_1.Column({ "default": 'Shafa Badran' })
    ], UserEntity.prototype, "district");
    __decorate([
        typeorm_1.Column({ "default": '' })
    ], UserEntity.prototype, "bio");
    __decorate([
        typeorm_1.Column({ "default": null, nullable: true })
    ], UserEntity.prototype, "image");
    __decorate([
        typeorm_1.Column({ "default": '' })
    ], UserEntity.prototype, "insuranceNumber");
    __decorate([
        typeorm_1.Column(),
        class_transformer_1.Exclude()
    ], UserEntity.prototype, "password");
    __decorate([
        typeorm_1.OneToOne(function () { return insurance_entity_1.InsuranceCompanyEntity; }, function (insurance) { return insurance.id; }),
        typeorm_1.JoinColumn()
    ], UserEntity.prototype, "insuranceCompany");
    __decorate([
        typeorm_1.ManyToMany(function (type) { return UserEntity_1; }, function (user) { return user.followee; }),
        typeorm_1.JoinTable()
    ], UserEntity.prototype, "followers");
    __decorate([
        typeorm_1.ManyToMany(function (type) { return UserEntity_1; }, function (user) { return user.subUsers; }),
        typeorm_1.JoinTable()
    ], UserEntity.prototype, "subUsers");
    __decorate([
        typeorm_1.ManyToOne(function () { return appointment_entity_1.AppointmentEntity; }, function (appointment) { return appointment.user; }),
        typeorm_1.JoinTable()
    ], UserEntity.prototype, "appointments");
    __decorate([
        typeorm_1.ManyToMany(function (type) { return UserEntity_1; }, function (user) { return user.followers; })
    ], UserEntity.prototype, "followee");
    __decorate([
        typeorm_1.BeforeInsert()
    ], UserEntity.prototype, "hashPassword");
    UserEntity = UserEntity_1 = __decorate([
        typeorm_1.Entity('users')
    ], UserEntity);
    return UserEntity;
}(abstract_entities_1.AbstractEntity));
exports.UserEntity = UserEntity;
