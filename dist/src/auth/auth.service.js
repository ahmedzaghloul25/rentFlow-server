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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const repo_1 = require("../DB/repo");
const jwtService_1 = require("../../common/services/jwtService");
const constants_1 = require("../../common/constants");
let AuthService = AuthService_1 = class AuthService {
    userRepo;
    jwtToken;
    logger;
    constructor(userRepo, jwtToken, logger) {
        this.userRepo = userRepo;
        this.jwtToken = jwtToken;
        this.logger = logger;
    }
    async registerNewUser(req, res) {
        try {
            if (!req.user.isVerified)
                throw new common_1.UnauthorizedException('USER_NOT_VERIFIED');
            const newUser = await this.userRepo.createNew(req.user);
            if (newUser) {
                return res.redirect(`${constants_1.APP_CONSTANTS.CLIENT_URL}/auth/login`);
            }
        }
        catch (error) {
            if (error.errorResponse.code === 11000) {
                throw new common_1.ConflictException('EMAIL_ALREADY_REGISTERED');
            }
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('ERROR_REGISTERING_USER');
        }
    }
    async login(req, res) {
        try {
            const { user } = req;
            const fetchedUser = await this.userRepo.findOneRecord({ email: user.email });
            if (!fetchedUser)
                throw new common_1.UnauthorizedException('EMAIL_NOT_REGISTERED');
            const accessToken = await this.jwtToken.createToken(fetchedUser);
            await this.userRepo.updateOneRecord({ _id: fetchedUser._id }, { isLoggedIn: true });
            return res.cookie(constants_1.APP_CONSTANTS.TOKEN_NAME, accessToken, constants_1.APP_CONSTANTS.COOKIE_OPTIONS)
                .redirect(`${constants_1.APP_CONSTANTS.CLIENT_URL}/dashboard`);
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error(`Failed to login for user ${req.user.email}`, error.stack, AuthService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO_LOGIN');
        }
    }
    async logout(req, res) {
        try {
            const result = await this.userRepo.updateOneRecord({ _id: req.user._id, isLoggedIn: true }, { isLoggedIn: false });
            if (!result.modifiedCount) {
                throw new common_1.NotFoundException('USER_NOT_FOUND');
            }
            res.clearCookie(constants_1.APP_CONSTANTS.TOKEN_NAME, {
                httpOnly: constants_1.APP_CONSTANTS.COOKIE_OPTIONS.httpOnly,
                sameSite: constants_1.APP_CONSTANTS.COOKIE_OPTIONS.sameSite,
                secure: constants_1.APP_CONSTANTS.COOKIE_OPTIONS.secure,
                signed: constants_1.APP_CONSTANTS.COOKIE_OPTIONS.signed
            });
            return res.status(200).json({ message: 'logged out successfully' });
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error(`Failed to logout for user ${req.user._id}`, error.stack, AuthService_1.name);
            throw new common_1.InternalServerErrorException('FAILED_TO_LOGOUT');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repo_1.UserRepo,
        jwtService_1.JwtToken,
        common_1.Logger])
], AuthService);
//# sourceMappingURL=auth.service.js.map