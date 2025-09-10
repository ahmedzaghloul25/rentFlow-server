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
exports.paymentModule = exports.paymentSchema = exports.Payment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const types_1 = require("../../../common/types");
const mongoose_2 = require("mongoose");
const contract_schema_1 = require("./contract.schema");
const user_schema_1 = require("./user.schema");
let Payment = class Payment {
    contract_id;
    user_id;
    due_date;
    due_amount;
    amount_paid;
    is_paid;
    payment_date;
    is_cancelled;
    payment_method;
};
exports.Payment = Payment;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.Types.ObjectId,
        ref: contract_schema_1.Contract.name
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Payment.prototype, "contract_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.User.name
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Payment.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true
    }),
    __metadata("design:type", Date)
], Payment.prototype, "due_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true
    }),
    __metadata("design:type", Number)
], Payment.prototype, "due_amount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Payment.prototype, "amount_paid", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false
    }),
    __metadata("design:type", Boolean)
], Payment.prototype, "is_paid", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Payment.prototype, "payment_date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Payment.prototype, "is_cancelled", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: types_1.PaymentMethodEnum,
    }),
    __metadata("design:type", String)
], Payment.prototype, "payment_method", void 0);
exports.Payment = Payment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Payment);
exports.paymentSchema = mongoose_1.SchemaFactory.createForClass(Payment);
exports.paymentModule = mongoose_1.MongooseModule.forFeature([
    { name: Payment.name, schema: exports.paymentSchema }
]);
//# sourceMappingURL=payment.schema.js.map