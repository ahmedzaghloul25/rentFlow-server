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
const userRepo_1 = require("../DB/repo/userRepo");
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
    async googleAuth(req, res) {
        try {
            let _user = null;
            const { user } = req;
            _user = await this.userRepo.findOneRecord({ email: user.email });
            if (!_user) {
                _user = await this.userRepo.createNew(req.user);
                this.logger.log(`New user registered ${_user._id}`, AuthService_1.name);
            }
            const accessToken = await this.jwtToken.createToken(_user);
            await this.userRepo.updateOneRecord({ _id: _user._id }, { isLoggedIn: true });
            return res.cookie(constants_1.APP_CONSTANTS.AUTH_TOKEN_NAME, accessToken, constants_1.APP_CONSTANTS.COOKIE_OPTIONS_AUTH)
                .redirect(`${process.env.CLIENT_URL}/dashboard`);
        }
        catch (error) {
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
            res.clearCookie(constants_1.APP_CONSTANTS.AUTH_TOKEN_NAME, {
                httpOnly: constants_1.APP_CONSTANTS.COOKIE_OPTIONS_AUTH.httpOnly,
                sameSite: constants_1.APP_CONSTANTS.COOKIE_OPTIONS_AUTH.sameSite,
                secure: constants_1.APP_CONSTANTS.COOKIE_OPTIONS_AUTH.secure,
                signed: constants_1.APP_CONSTANTS.COOKIE_OPTIONS_AUTH.signed
            });
            res.clearCookie(constants_1.APP_CONSTANTS.CSRF_TOKEN_NAME, {
                httpOnly: constants_1.APP_CONSTANTS.COOKIE_OPTIONS_CSRF.httpOnly,
                sameSite: constants_1.APP_CONSTANTS.COOKIE_OPTIONS_CSRF.sameSite,
                secure: constants_1.APP_CONSTANTS.COOKIE_OPTIONS_CSRF.secure,
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
    __metadata("design:paramtypes", [userRepo_1.UserRepo,
        jwtService_1.JwtToken,
        common_1.Logger])
], AuthService);
//# sourceMappingURL=auth.service.js.map