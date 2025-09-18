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
exports.contractModule = exports.contractSchema = exports.Contract = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const property_schema_1 = require("./property.schema");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const client_schema_1 = require("./client.schema");
const types_1 = require("../../../common/types/types");
let Contract = class Contract {
    property_id;
    user_id;
    client_id;
    end_date;
    start_date;
    actual_end_date;
    is_terminated;
    initial_rent;
    payment_interval;
    annual_increase;
    security_deposit;
    isPaymentsCreated;
};
exports.Contract = Contract;
__decorate([
    (0, mongoose_1.Prop)({
        ref: property_schema_1.Property.name,
        required: true,
        type: mongoose_2.Types.ObjectId
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Contract.prototype, "property_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        ref: user_schema_1.User.name,
        required: true,
        type: mongoose_2.Types.ObjectId
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Contract.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        ref: client_schema_1.Client.name,
        required: true,
        type: mongoose_2.Types.ObjectId
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Contract.prototype, "client_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true
    }),
    __metadata("design:type", Date)
], Contract.prototype, "end_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true
    }),
    __metadata("design:type", Date)
], Contract.prototype, "start_date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Contract.prototype, "actual_end_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false
    }),
    __metadata("design:type", Boolean)
], Contract.prototype, "is_terminated", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        min: 1
    }),
    __metadata("design:type", Number)
], Contract.prototype, "initial_rent", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: types_1.PaymentInterval
    }),
    __metadata("design:type", Number)
], Contract.prototype, "payment_interval", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        min: 0,
        max: 100
    }),
    __metadata("design:type", Number)
], Contract.prototype, "annual_increase", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        min: 0,
    }),
    __metadata("design:type", Number)
], Contract.prototype, "security_deposit", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false
    }),
    __metadata("design:type", Boolean)
], Contract.prototype, "isPaymentsCreated", void 0);
exports.Contract = Contract = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Contract);
exports.contractSchema = mongoose_1.SchemaFactory.createForClass(Contract);
exports.contractModule = mongoose_1.MongooseModule.forFeature([
    { name: Contract.name, schema: exports.contractSchema }
]);
//# sourceMappingURL=contract.schema.js.map