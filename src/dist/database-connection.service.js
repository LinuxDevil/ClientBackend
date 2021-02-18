"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DatabaseConnectionService = void 0;
var common_1 = require("@nestjs/common");
var DatabaseConnectionService = /** @class */ (function () {
    function DatabaseConnectionService() {
    }
    DatabaseConnectionService.prototype.createTypeOrmOptions = function () {
        return {
            name: 'default',
            type: 'postgres',
            host: process.env.DATABAE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: 'postgres',
            password: 'postgres',
            database: process.env.DATABASE_DB,
            synchronize: true,
            dropSchema: false,
            logging: true,
            entities: ['dist/**/*.entity.js']
        };
    };
    DatabaseConnectionService = __decorate([
        common_1.Injectable()
    ], DatabaseConnectionService);
    return DatabaseConnectionService;
}());
exports.DatabaseConnectionService = DatabaseConnectionService;
