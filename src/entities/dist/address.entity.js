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
exports.AddressEntity = void 0;
var abstract_entities_1 = require("./abstract-entities");
var AddressEntity = /** @class */ (function (_super) {
    __extends(AddressEntity, _super);
    function AddressEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AddressEntity;
}(abstract_entities_1.AbstractEntity));
exports.AddressEntity = AddressEntity;
