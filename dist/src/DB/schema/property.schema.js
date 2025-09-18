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
exports.propertyModule = exports.propertySchema = exports.Property = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const types_1 = require("../../../common/types/types");
const user_schema_1 = require("./user.schema");
let Property = class Property {
    number;
    type;
    city;
    district;
    building;
    notes;
    user_id;
    isDeleted;
};
exports.Property = Property;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minlength: 1,
        maxlength: 10
    }),
    __metadata("design:type", String)
], Property.prototype, "number", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: types_1.PropertyType,
        required: true
    }),
    __metadata("design:type", String)
], Property.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: types_1.EgyptianCity,
        required: true
    }),
    __metadata("design:type", String)
], Property.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true
    }),
    __metadata("design:type", String)
], Property.prototype, "district", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true
    }),
    __metadata("design:type", String)
], Property.prototype, "building", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        maxLength: 200
    }),
    __metadata("design:type", String)
], Property.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.User.name
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Property.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Property.prototype, "isDeleted", void 0);
exports.Property = Property = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Property);
exports.propertySchema = mongoose_1.SchemaFactory.createForClass(Property);
exports.propertySchema.index({ number: 1, district: 1 }, { unique: true });
exports.propertyModule = mongoose_1.MongooseModule.forFeature([
    { name: Property.name, schema: exports.propertySchema }
]);
//# sourceMappingURL=property.schema.js.map