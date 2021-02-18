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
exports.MajorEntity = void 0;
var typeorm_1 = require("typeorm");
var abstract_entities_1 = require("./abstract-entities");
var doctor_entity_1 = require("./doctor.entity");
var MajorEntity = /** @class */ (function (_super) {
    __extends(MajorEntity, _super);
    function MajorEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column()
    ], MajorEntity.prototype, "nameAr");
    __decorate([
        typeorm_1.Column()
    ], MajorEntity.prototype, "nameEn");
    __decorate([
        typeorm_1.Column({ "default": null, nullable: true })
    ], MajorEntity.prototype, "imageUrl");
    __decorate([
        typeorm_1.OneToMany(function () { return doctor_entity_1.DoctorEntity; }, function (doctor) { return doctor.id; })
    ], MajorEntity.prototype, "doctors");
    MajorEntity = __decorate([
        typeorm_1.Entity('major')
    ], MajorEntity);
    return MajorEntity;
}(abstract_entities_1.AbstractEntity));
exports.MajorEntity = MajorEntity;
