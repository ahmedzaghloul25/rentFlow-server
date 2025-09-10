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
exports.ContractController = void 0;
const common_1 = require("@nestjs/common");
const contract_service_1 = require("./contract.service");
const guards_1 = require("../../common/guards");
const pipes_1 = require("../../common/pipes");
const DTO_1 = require("./DTO");
let ContractController = class ContractController {
    contractService;
    constructor(contractService) {
        this.contractService = contractService;
    }
    async createContract(req, property, body) {
        return await this.contractService.createNewContract(req, property, body);
    }
    async terminateContract(req, contractId) {
        return await this.contractService.terminateContract(req, contractId);
    }
    async getAllContracts(req, filtersDto) {
        const { page, limit, ...filters } = filtersDto;
        return await this.contractService.getAllContracts(req, filters, page, limit);
    }
    async getContract(req, contractId) {
        return await this.contractService.getContract(req, contractId);
    }
};
exports.ContractController = ContractController;
__decorate([
    (0, common_1.Post)(':propertyId'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('propertyId', pipes_1.ValidateProperty)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, DTO_1.CreateNewContract]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "createContract", null);
__decorate([
    (0, common_1.Post)('terminate/:contractId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('contractId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "terminateContract", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, DTO_1.ContractQueryFilter]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getAllContracts", null);
__decorate([
    (0, common_1.Get)(':contractId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('contractId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getContract", null);
exports.ContractController = ContractController = __decorate([
    (0, common_1.Controller)('contracts'),
    (0, common_1.UseGuards)(guards_1.ValidateToken),
    __metadata("design:paramtypes", [contract_service_1.ContractService])
], ContractController);
//# sourceMappingURL=contract.controller.js.map