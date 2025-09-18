"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const dashboard_controller_1 = require("./dashboard.controller");
const dashboard_service_1 = require("./dashboard.service");
const contract_schema_1 = require("../DB/schema/contract.schema");
const payment_schema_1 = require("../DB/schema/payment.schema");
const user_schema_1 = require("../DB/schema/user.schema");
const jwt_1 = require("@nestjs/jwt");
const jwtService_1 = require("../../common/services/jwtService");
const paymentRepo_1 = require("../DB/repo/paymentRepo");
const contractRepo_1 = require("../DB/repo/contractRepo");
const userRepo_1 = require("../DB/repo/userRepo");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [payment_schema_1.paymentModule, contract_schema_1.contractModule, user_schema_1.userModule],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService, paymentRepo_1.PaymentRepo, contractRepo_1.ContractRepo, userRepo_1.UserRepo, jwt_1.JwtService, jwtService_1.JwtToken, common_1.Logger]
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map