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
const schema_1 = require("../DB/schema");
const jwt_1 = require("@nestjs/jwt");
const services_1 = require("../../common/services");
const paymentRepo_1 = require("../DB/repo/paymentRepo");
const contractRepo_1 = require("../DB/repo/contractRepo");
const userRepo_1 = require("../DB/repo/userRepo");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [schema_1.paymentModule, schema_1.contractModule, schema_1.userModule],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService, paymentRepo_1.PaymentRepo, contractRepo_1.ContractRepo, userRepo_1.UserRepo, jwt_1.JwtService, services_1.JwtToken, common_1.Logger]
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map