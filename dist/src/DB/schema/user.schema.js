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
exports.userModule = exports.userSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let User = class User {
    firstName;
    lastName;
    email;
    isVerified;
    picture;
    isLoggedIn;
    fullName;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minlength: 3,
        maxlength: 100
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minlength: 3,
        maxlength: 100
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "picture", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isLoggedIn", void 0);
__decorate([
    (0, mongoose_1.Virtual)({
        get: function () {
            return `${this.firstName} ${this.lastName}`;
        }
    }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
], User);
exports.userSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.userModule = mongoose_1.MongooseModule.forFeature([
    { name: User.name, schema: exports.userSchema }
]);
//# sourceMappingURL=user.schema.js.map