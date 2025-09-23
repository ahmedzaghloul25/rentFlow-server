import { HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepo } from '../DB/repo/userRepo';
import { _Request } from '../../common/types/types';
import { JwtToken } from '../../common/services/jwtService';
import { Response } from 'express';
import { Hashing } from '../../common/services/hash';
import { UserDoc } from 'src/DB/schema/user.schema';


@Injectable()
export class AuthService {
    constructor(
        private readonly userRepo: UserRepo,
        private readonly jwtToken: JwtToken,
        private logger: Logger,
        private hashing: Hashing

    ) { }
    //=========================== register ================================
    /**
     * user registration
     * @param body - object containing user information
     * @returns success boolean
     */
    async register(body: { email: string, password: string, firstName: string, lastName: string, secret: string }) {
        try {
            const _secret = process.env.REGISTER_SECRET
            if (body.secret !== _secret) {
                this.logger.warn(`Attempt to register with invalid secret ${body.email}`, AuthService.name)
                return { success: true }
            }
            const user = await this.userRepo.createNew({
                email: body.email,
                password: this.hashing.createHash(body.password),
                firstName: body.firstName,
                lastName: body.lastName
            }) as UserDoc
            this.logger.log(`New user registered ${user.email}`, AuthService.name)
            return { success: true }
        } catch (error) {
            this.logger.error(`Failed to register user ${body.email}`, error.stack, AuthService.name)
            throw new InternalServerErrorException('FAILED_TO_REGISTER')
        }
    }
    //=========================== login ====================================
    /**
     * user login
     * @param req - express request containing user information  
     * @returns accessToken in case user registered already
     */
    async login(body: { email: string, password: string }) {
        try {
            const user = await this.userRepo.findOneRecord({ email: body.email })
            if (!user || !this.hashing.verifyHash(body.password, user.password)) throw new UnauthorizedException('INVALID_CREDENTIALS')
            const token = await this.jwtToken.createToken(user)
            await this.userRepo.updateOneRecord({ _id: user._id }, { isLoggedIn: true })
            return { token }
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error(`Failed to login for user ${body.email}`, error.stack, AuthService.name)
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
            return res.status(200).json({ message: 'logged out successfully' })
        } catch (error) {
            if (error instanceof HttpException) throw error
            this.logger.error(`Failed to logout for user ${req.user._id}`, error.stack, AuthService.name)
            throw new InternalServerErrorException('FAILED_TO_LOGOUT')
        }
    }
}
