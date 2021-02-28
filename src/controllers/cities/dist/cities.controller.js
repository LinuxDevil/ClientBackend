"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CitiesController = void 0;
var common_1 = require("@nestjs/common");
var CitiesController = /** @class */ (function () {
    function CitiesController(citiesService) {
        this.citiesService = citiesService;
    }
    CitiesController.prototype.getcities = function () {
        return this.citiesService.getCities();
    };
    CitiesController.prototype.createCity = function (cityDTO) {
        return this.citiesService.createNewCity(cityDTO);
    };
    __decorate([
        common_1.Get()
    ], CitiesController.prototype, "getcities");
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], CitiesController.prototype, "createCity");
    CitiesController = __decorate([
        common_1.Controller('cities')
    ], CitiesController);
    return CitiesController;
}());
exports.CitiesController = CitiesController;
