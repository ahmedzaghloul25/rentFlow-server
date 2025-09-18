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
exports.JwtToken = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../../common/constants/constants");
let JwtToken = class JwtToken {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async createToken(user) {
        const payload = { email: user.email, _id: user._id };
        const token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET_ACCESS,
            expiresIn: constants_1.APP_CONSTANTS.JWT_EXPIRE
        });
        return token;
    }
    async verifyToken(token) {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET_ACCESS,
            });
            return payload;
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new common_1.UnauthorizedException("TOKEN_EXPIRED");
            }
            if (error.name === "JsonWebTokenError") {
                throw new common_1.UnauthorizedException("INVALID_TOKEN_FORMAT");
            }
            throw new common_1.UnauthorizedException("TOKEN_VERIFICATION_FAILED");
        }
    }
};
exports.JwtToken = JwtToken;
exports.JwtToken = JwtToken = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtToken);
//# sourceMappingURL=jwtService.js.map