"use strict";
exports.__esModule = true;
exports.Place = exports.Doctor = exports.User = void 0;
var common_1 = require("@nestjs/common");
exports.User = common_1.createParamDecorator(function (data, ctx) {
    var req = ctx.switchToHttp().getRequest();
    return req.user;
});
exports.Doctor = common_1.createParamDecorator(function (data, ctx) {
    var req = ctx.switchToHttp().getRequest();
    return req.user;
});
exports.Place = common_1.createParamDecorator(function (data, ctx) {
    var req = ctx.switchToHttp().getRequest();
    return req.place;
});
