import { Controller, Get, InternalServerErrorException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { _Request, GoogleReq } from '../../common/types/types';
import type { Response } from 'express';
import { ValidateToken } from '../../common/guards/validateToken';
import { randomBytes } from 'crypto'
import { APP_CONSTANTS } from '../../common/constants/constants';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
    ) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async authGoogle(@Req() req) { }

    @Get('google-redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: GoogleReq, @Res() res: Response) {
        return await this.authService.googleAuth(req, res)
    }

    @Get('profile')
    @UseGuards(ValidateToken)
    getProfile(@Req() req: _Request, @Res({ passthrough: true }) res: Response) {
        try {
            const csrfToken = randomBytes(100).toString('hex')
            res.cookie(APP_CONSTANTS.CSRF_TOKEN_NAME, csrfToken, APP_CONSTANTS.COOKIE_OPTIONS_CSRF)
            return { user: req.user, csrfToken }
        } catch (error) {
            throw new InternalServerErrorException('ERROR_GETTING_PROFILE')
        }

    }

    @Post('logout')
    @UseGuards(ValidateToken)
    async logout(@Req() req: _Request, @Res() res: Response) {
        return await this.authService.logout(req, res)
    }
}
