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
exports.ClientDto = void 0;
const class_validator_1 = require("class-validator");
class ClientDto {
    firstName;
    middleName;
    lastName;
    ID_no;
    phone;
}
exports.ClientDto = ClientDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ClientDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ClientDto.prototype, "middleName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ClientDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.MinLength)(14),
    (0, class_validator_1.MaxLength)(14),
    __metadata("design:type", String)
], ClientDto.prototype, "ID_no", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.MinLength)(11),
    (0, class_validator_1.MaxLength)(11),
    __metadata("design:type", String)
], ClientDto.prototype, "phone", void 0);
//# sourceMappingURL=clientDto.js.map