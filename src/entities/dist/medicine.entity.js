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
exports.MedicineEntity = void 0;
var typeorm_1 = require("typeorm");
var abstract_entities_1 = require("./abstract-entities");
var MedicineEntity = /** @class */ (function (_super) {
    __extends(MedicineEntity, _super);
    function MedicineEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column()
    ], MedicineEntity.prototype, "name");
    __decorate([
        typeorm_1.Column()
    ], MedicineEntity.prototype, "price");
    __decorate([
        typeorm_1.Column()
    ], MedicineEntity.prototype, "quantity");
    __decorate([
        typeorm_1.Column()
    ], MedicineEntity.prototype, "description");
    __decorate([
        typeorm_1.Column()
    ], MedicineEntity.prototype, "imageUrl");
    __decorate([
        typeorm_1.Column()
    ], MedicineEntity.prototype, "currency");
    MedicineEntity = __decorate([
        typeorm_1.Entity('medicine')
    ], MedicineEntity);
    return MedicineEntity;
}(abstract_entities_1.AbstractEntity));
exports.MedicineEntity = MedicineEntity;
