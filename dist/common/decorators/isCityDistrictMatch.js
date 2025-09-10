"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCityDistrictMatch = IsCityDistrictMatch;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const maps_1 = require("../maps");
function IsCityDistrictMatch(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isCityDistrictMatch',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, validationArguments) {
                    if (!value) {
                        throw new common_1.BadRequestException('INVALID_DISTRICT_VALUE');
                    }
                    const obj = validationArguments.object;
                    const city = obj.city;
                    const relatedDistricts = maps_1.cityDistrictMap.get(city);
                    if (!city || !relatedDistricts) {
                        throw new common_1.BadRequestException("INVALID_CITY_VALUE");
                    }
                    return relatedDistricts.includes(value.toUpperCase());
                },
                defaultMessage() {
                    return "District is not matched with selected City";
                },
            }
        });
    };
}
//# sourceMappingURL=isCityDistrictMatch.js.map