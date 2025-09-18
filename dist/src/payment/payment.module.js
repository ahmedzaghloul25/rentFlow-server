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
const user_schema_1 = require("../DB/schema/user.schema");
const payment_schema_1 = require("../DB/schema/payment.schema");
const jwtService_1 = require("../../common/services/jwtService");
const jwt_1 = require("@nestjs/jwt");
const paymentRepo_1 = require("../DB/repo/paymentRepo");
const userRepo_1 = require("../DB/repo/userRepo");
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [payment_schema_1.paymentModule, user_schema_1.userModule],
        providers: [payment_service_1.PaymentService, paymentRepo_1.PaymentRepo, common_1.Logger, jwtService_1.JwtToken, jwt_1.JwtService, userRepo_1.UserRepo],
        controllers: [payment_controller_1.PaymentController],
        exports: [paymentRepo_1.PaymentRepo]
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map