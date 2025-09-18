"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const payment_controller_1 = require("./payment.controller");
const schema_1 = require("../DB/schema");
const services_1 = require("../../common/services");
const jwt_1 = require("@nestjs/jwt");
const payment_repo_1 = require("../DB/repo/payment.repo");
const user_repo_1 = require("../DB/repo/user.repo");
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [schema_1.paymentModule, schema_1.userModule],
        providers: [payment_service_1.PaymentService, payment_repo_1.PaymentRepo, common_1.Logger, services_1.JwtToken, jwt_1.JwtService, user_repo_1.UserRepo],
        controllers: [payment_controller_1.PaymentController],
        exports: [payment_repo_1.PaymentRepo]
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map