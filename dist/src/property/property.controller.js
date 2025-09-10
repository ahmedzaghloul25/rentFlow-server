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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const common_1 = require("@nestjs/common");
const property_service_1 = require("./property.service");
const guards_1 = require("../../common/guards");
const propertyDto_1 = require("./DTO/propertyDto");
const pipes_1 = require("../../common/pipes");
let PropertyController = class PropertyController {
    propertyService;
    constructor(propertyService) {
        this.propertyService = propertyService;
    }
    async addNewProperty(req, body) {
        return await this.propertyService.addNewProperty(req, body);
    }
    async deleteProperty(property, req) {
        return await this.propertyService.deleteProperty(property, req);
    }
    async getAllProperties(req, page, limit) {
        return await this.propertyService.getAllProperties(req, page, limit);
    }
    async getProperty(propertyId, req) {
        return await this.propertyService.getProperty(propertyId, req);
    }
};
exports.PropertyController = PropertyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, propertyDto_1.AddNewProperty]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "addNewProperty", null);
__decorate([
    (0, common_1.Delete)(':propertyId'),
    __param(0, (0, common_1.Param)('propertyId', pipes_1.ValidateProperty)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "deleteProperty", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getAllProperties", null);
__decorate([
    (0, common_1.Get)(':propertyId'),
    __param(0, (0, common_1.Param)('propertyId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getProperty", null);
exports.PropertyController = PropertyController = __decorate([
    (0, common_1.Controller)('properties'),
    (0, common_1.UseGuards)(guards_1.ValidateToken),
    __metadata("design:paramtypes", [property_service_1.PropertyService])
], PropertyController);
//# sourceMappingURL=property.controller.js.map