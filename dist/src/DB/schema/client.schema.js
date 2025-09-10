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
exports.clientModule = exports.clientSchema = exports.Client = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Client = class Client {
    firstName;
    middleName;
    lastName;
    ID_no;
    phone;
    user_id;
    fullName;
    isDeleted;
};
exports.Client = Client;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minlength: 3,
        maxLength: 50
    }),
    __metadata("design:type", String)
], Client.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minlength: 3,
        maxLength: 50
    }),
    __metadata("design:type", String)
], Client.prototype, "middleName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minlength: 3,
        maxLength: 50
    }),
    __metadata("design:type", String)
], Client.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minLength: 14,
        maxlength: 14,
    }),
    __metadata("design:type", String)
], Client.prototype, "ID_no", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        maxLength: 11,
        minlength: 11,
    }),
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        required: true
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Client.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Virtual)({
        get() {
            return `${this.firstName} ${this.middleName} ${this.lastName}`;
        }
    }),
    __metadata("design:type", String)
], Client.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Client.prototype, "isDeleted", void 0);
exports.Client = Client = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } })
], Client);
exports.clientSchema = mongoose_1.SchemaFactory.createForClass(Client);
exports.clientSchema.index({ user_id: 1, ID_no: 1 }, { unique: true });
exports.clientModule = mongoose_1.MongooseModule.forFeature([
    { name: Client.name, schema: exports.clientSchema }
]);
//# sourceMappingURL=client.schema.js.map