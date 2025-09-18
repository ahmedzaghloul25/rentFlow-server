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
exports.ValidateToken = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const services_1 = require("../services");
const userRepo_1 = require("../../src/DB/repo/userRepo");
let ValidateToken = class ValidateToken {
    jewToken;
    userRepo;
    constructor(jewToken, userRepo) {
        this.jewToken = jewToken;
        this.userRepo = userRepo;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.signedCookies[constants_1.APP_CONSTANTS.AUTH_TOKEN_NAME];
        if (!token) {
            throw new common_1.BadRequestException('TOKEN_NOT_FOUND');
        }
        const validation = await this.jewToken.verifyToken(token);
        const loggedInUser = await this.userRepo.findOneRecord({ _id: validation._id, isLoggedIn: true });
        if (!loggedInUser) {
            return false;
        }
        request.user = loggedInUser;
        return true;
    }
};
exports.ValidateToken = ValidateToken;
exports.ValidateToken = ValidateToken = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [services_1.JwtToken,
        userRepo_1.UserRepo])
], ValidateToken);
//# sourceMappingURL=validateToken.js.map