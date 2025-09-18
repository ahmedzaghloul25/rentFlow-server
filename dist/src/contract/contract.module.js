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
const contract_schema_1 = require("../DB/schema/contract.schema");
const payment_schema_1 = require("../DB/schema/payment.schema");
const user_schema_1 = require("../DB/schema/user.schema");
const property_schema_1 = require("../DB/schema/property.schema");
const jwtService_1 = require("../../common/services/jwtService");
const jwt_1 = require("@nestjs/jwt");
const contractRepo_1 = require("../DB/repo/contractRepo");
const paymentRepo_1 = require("../DB/repo/paymentRepo");
const propertyRepo_1 = require("../DB/repo/propertyRepo");
const userRepo_1 = require("../DB/repo/userRepo");
let ContractModule = class ContractModule {
};
exports.ContractModule = ContractModule;
exports.ContractModule = ContractModule = __decorate([
    (0, common_1.Module)({
        imports: [contract_schema_1.contractModule, payment_schema_1.paymentModule, user_schema_1.userModule, property_schema_1.propertyModule],
        controllers: [contract_controller_1.ContractController],
        providers: [contract_service_1.ContractService, contractRepo_1.ContractRepo, paymentRepo_1.PaymentRepo, propertyRepo_1.PropertyRepo, common_1.Logger, userRepo_1.UserRepo, jwtService_1.JwtToken, jwt_1.JwtService],
        exports: [contractRepo_1.ContractRepo]
    })
], ContractModule);
//# sourceMappingURL=contract.module.js.map