import { ConflictException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepo } from 'src/DB/repo';
import { _Request, GoogleReq } from 'common/types';
import { JwtToken } from 'common/services/jwtService';
import { Response } from 'express';
import { APP_CONSTANTS } from 'common/constants';


@Injectable()
export class AuthService {
    constructor(
        private readonly userRepo: UserRepo,
        private readonly jwtToken: JwtToken,
        private logger: Logger

    ) { }
    /**
     * Register a new user
     * @param req - express request containing user information 
     * @returns object containing success boolean, message and user created
     */
    //====================== registerNewUser ===============================
    async registerNewUser(req: GoogleReq) {
        try {
            if (!req.user.isVerified) throw new UnauthorizedException('USER_NOT_VERIFIED')
            const newUser = await this.userRepo.createNew(req.user)
            return {
                message: 'user registered successfully',
                user: newUser
            }
        } catch (error) {
            if (error.errorResponse.code === 11000) {
                throw new ConflictException('EMAIL_ALREADY_REGISTERED')
            }
            if (error instanceof HttpException) {
                throw error
            }
            throw new InternalServerErrorException('ERROR_REGISTERING_USER')
        }
    }
    //=========================== login ====================================
    /**
     * user login
     * @param req - express request containing user information  
     * @returns accessToken in case user registered already
     */
    async login(req: GoogleReq, res: Response) {
        try {
            const { user } = req
            const fetchedUser = await this.userRepo.findOneRecord({ email: user.email })
            if (!fetchedUser) throw new UnauthorizedException('EMAIL_NOT_REGISTERED')
            const accessToken = await this.jwtToken.createToken(fetchedUser)
            await this.userRepo.updateOneRecord({ _id: fetchedUser._id }, { isLoggedIn: true })
            return res.cookie(APP_CONSTANTS.TOKEN_NAME, accessToken, APP_CONSTANTS.COOKIE_OPTIONS);
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error(`Failed to login for user ${req.user.email}`, error.stack, AuthService.name)
            throw new InternalServerErrorException('FAILED_TO_LOGIN')
        }

    }
    //=========================== logout ===================================
    /**
     * user logout
     * @param req - express request containing token payload after verifying
     * @returns object containing success boolean and message
     */
    async logout(req: _Request, res: Response) {
        try {
            const result = await this.userRepo.updateOneRecord({ _id: req.user._id, isLoggedIn: true }, { isLoggedIn: false })
            if (!result.modifiedCount) {
                throw new NotFoundException('USER_NOT_FOUND')
            }
            return res.clearCookie(APP_CONSTANTS.TOKEN_NAME, {
                httpOnly: APP_CONSTANTS.COOKIE_OPTIONS.httpOnly,
                sameSite: APP_CONSTANTS.COOKIE_OPTIONS.sameSite,
                secure: APP_CONSTANTS.COOKIE_OPTIONS.secure,
                signed: APP_CONSTANTS.COOKIE_OPTIONS.signed
            })
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error(`Failed to logout for user ${req.user._id}`, error.stack, AuthService.name)
            throw new InternalServerErrorException('FAILED_TO_LOGOUT')
        }
    }
}
