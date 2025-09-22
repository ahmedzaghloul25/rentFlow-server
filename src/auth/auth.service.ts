import { HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UserRepo } from '../DB/repo/userRepo';
import { _Request, GoogleReq } from '../../common/types/types';
import { JwtToken } from '../../common/services/jwtService';
import { Response } from 'express';
import { APP_CONSTANTS } from '../../common/constants/constants';
import { UserDoc } from '../DB/schema/user.schema';
import { randomBytes } from 'crypto';


@Injectable()
export class AuthService {
    constructor(
        private readonly userRepo: UserRepo,
        private readonly jwtToken: JwtToken,
        private logger: Logger

    ) { }
    //=========================== googleAuth ====================================
    /**
     * user googleAuth
     * @param req - express request containing user information  
     * @returns accessToken in case user registered already
     */
    async googleAuth(req: GoogleReq, res: Response) {
        try {
            let _user: UserDoc | null = null
            const { user } = req
            _user = await this.userRepo.findOneRecord({ email: user.email })
            if (!_user) {
                _user = await this.userRepo.createNew(req.user) as UserDoc
                this.logger.log(`New user registered ${_user._id}`, AuthService.name)
            }
            const accessToken = await this.jwtToken.createToken(_user)
            await this.userRepo.updateOneRecord({ _id: _user._id }, { isLoggedIn: true })
            res.cookie(APP_CONSTANTS.AUTH_TOKEN_NAME, accessToken, APP_CONSTANTS.COOKIE_OPTIONS_AUTH)
            const csrfToken = randomBytes(100).toString('hex')
            res.cookie(APP_CONSTANTS.CSRF_TOKEN_NAME, csrfToken, APP_CONSTANTS.COOKIE_OPTIONS_CSRF)
            return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
        } catch (error) {
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
            res.clearCookie(APP_CONSTANTS.AUTH_TOKEN_NAME, {
                httpOnly: APP_CONSTANTS.COOKIE_OPTIONS_AUTH.httpOnly,
                sameSite: APP_CONSTANTS.COOKIE_OPTIONS_AUTH.sameSite,
                secure: APP_CONSTANTS.COOKIE_OPTIONS_AUTH.secure,
                signed: APP_CONSTANTS.COOKIE_OPTIONS_AUTH.signed
            })
            res.clearCookie(APP_CONSTANTS.CSRF_TOKEN_NAME, {
                httpOnly: APP_CONSTANTS.COOKIE_OPTIONS_CSRF.httpOnly,
                sameSite: APP_CONSTANTS.COOKIE_OPTIONS_CSRF.sameSite,
                secure: APP_CONSTANTS.COOKIE_OPTIONS_CSRF.secure,
            })
            return res.status(200).json({ message: 'logged out successfully' })
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error(`Failed to logout for user ${req.user._id}`, error.stack, AuthService.name)
            throw new InternalServerErrorException('FAILED_TO_LOGOUT')
        }
    }
}
