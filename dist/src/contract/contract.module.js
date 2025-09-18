"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractModule = void 0;
const common_1 = require("@nestjs/common");
const contract_controller_1 = require("./contract.controller");
const contract_service_1 = require("./contract.service");
const schema_1 = require("../DB/schema");
const services_1 = require("../../common/services");
const jwt_1 = require("@nestjs/jwt");
const contract_repo_1 = require("../DB/repo/contract.repo");
const payment_repo_1 = require("../DB/repo/payment.repo");
const property_repo_1 = require("../DB/repo/property.repo");
const user_repo_1 = require("../DB/repo/user.repo");
let ContractModule = class ContractModule {
};
exports.ContractModule = ContractModule;
exports.ContractModule = ContractModule = __decorate([
    (0, common_1.Module)({
        imports: [schema_1.contractModule, schema_1.paymentModule, schema_1.userModule, schema_1.propertyModule],
        controllers: [contract_controller_1.ContractController],
        providers: [contract_service_1.ContractService, contract_repo_1.ContractRepo, payment_repo_1.PaymentRepo, property_repo_1.PropertyRepo, common_1.Logger, user_repo_1.UserRepo, services_1.JwtToken, jwt_1.JwtService],
        exports: [contract_repo_1.ContractRepo]
    })
], ContractModule);
//# sourceMappingURL=contract.module.js.map