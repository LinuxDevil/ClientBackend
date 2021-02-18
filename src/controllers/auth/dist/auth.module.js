"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
var auth_controller_1 = require("./auth.controller");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("src/entities/user.entity");
var jwt_1 = require("@nestjs/jwt");
var passport_1 = require("@nestjs/passport");
var jwt_strategy_1 = require("./jwt.strategy");
var sms_service_1 = require("src/services/sms/sms.service");
var nestjs_twilio_1 = require("nestjs-twilio");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
                jwt_1.JwtModule.register({
                    secret: 'AloUsHSecretKEY',
                    signOptions: {
                        expiresIn: 360000000000
                    }
                }),
                passport_1.PassportModule.register({
                    defaultStrategy: 'jwt'
                }),
                nestjs_twilio_1.TwilioModule.forRoot({
                    accountSid: process.env.TWILIO_ACCOUNT_SID,
                    authToken: process.env.TWILIO_AUTH_TOKEN
                })
            ],
            providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, sms_service_1.SmsService],
            controllers: [auth_controller_1.AuthController],
            exports: [passport_1.PassportModule, jwt_strategy_1.JwtStrategy, auth_service_1.AuthService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
