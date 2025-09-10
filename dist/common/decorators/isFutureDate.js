"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFutureDate = IsFutureDate;
const class_validator_1 = require("class-validator");
function IsFutureDate(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isFutureDate',
            propertyName,
            target: object.constructor,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(value) {
                    const now = new Date();
                    return value instanceof Date && value > now;
                },
                defaultMessage() {
                    return "End Date should be greater than today";
                }
            }
        });
    };
}
//# sourceMappingURL=isFutureDate.js.map