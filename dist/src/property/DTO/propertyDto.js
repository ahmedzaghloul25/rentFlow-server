"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewProperty = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const isCityDistrictMatch_1 = require("../../../common/decorators/isCityDistrictMatch");
const types_1 = require("../../../common/types");
class AddNewProperty {
    number;
    type;
    city;
    district;
    building;
    notes;
}
exports.AddNewProperty = AddNewProperty;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], AddNewProperty.prototype, "number", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(types_1.PropertyType),
    (0, class_transformer_1.Transform)(({ value }) => { return value.toUpperCase(); }),
    __metadata("design:type", String)
], AddNewProperty.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(types_1.EgyptianCity),
    (0, class_transformer_1.Transform)(({ value }) => { return value.toUpperCase(); }),
    __metadata("design:type", String)
], AddNewProperty.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, isCityDistrictMatch_1.IsCityDistrictMatch)(),
    __metadata("design:type", String)
], AddNewProperty.prototype, "district", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], AddNewProperty.prototype, "building", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], AddNewProperty.prototype, "notes", void 0);
//# sourceMappingURL=propertyDto.js.map