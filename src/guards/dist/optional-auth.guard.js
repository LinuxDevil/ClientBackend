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
exports.__esModule = true;
exports.OptionalAuthGuard = void 0;
var passport_1 = require("@nestjs/passport");
var OptionalAuthGuard = /** @class */ (function (_super) {
    __extends(OptionalAuthGuard, _super);
    function OptionalAuthGuard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OptionalAuthGuard.prototype.handleRequest = function (error, user, info, context) {
        return user;
    };
    return OptionalAuthGuard;
}(passport_1.AuthGuard('jwt')));
exports.OptionalAuthGuard = OptionalAuthGuard;
