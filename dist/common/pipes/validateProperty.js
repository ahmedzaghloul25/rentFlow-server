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
exports.ValidateProperty = void 0;
const common_1 = require("@nestjs/common");
const repo_1 = require("../../src/DB/repo");
let ValidateProperty = class ValidateProperty {
    propertyRepo;
    constructor(propertyRepo) {
        this.propertyRepo = propertyRepo;
    }
    async transform(value) {
        if (!value)
            throw new common_1.UnauthorizedException('PROPERTY_ID_REQUIRED');
        const property = await this.propertyRepo.findOneRecord({ _id: value, isDeleted: { $exists: false } });
        if (!property)
            throw new common_1.NotFoundException('PROPERTY_NOT_FOUND');
        return property;
    }
};
exports.ValidateProperty = ValidateProperty;
exports.ValidateProperty = ValidateProperty = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repo_1.PropertyRepo])
], ValidateProperty);
//# sourceMappingURL=validateProperty.js.map