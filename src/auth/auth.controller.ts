import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { _Request, GoogleReq } from 'common/types';
import type { Response } from 'express';
import { ValidateToken } from 'common/guards';
import { APP_CONSTANTS } from 'common/constants';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('signup')
    async googleSignup(@Req() req, @Res() res) {
        req.session.intent = 'signup'
        res.redirect('/auth/google')
    }

    @Get('login')
    async googleLogin(@Req() req, @Res() res) {
        req.session.intent = 'login'
        res.redirect('/auth/google')
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async authGoogle(@Req() req) { }

    @Get('google-redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: GoogleReq, @Res() res: Response) {
        if (req.user.authIntent === 'signup') {
            return await this.authService.registerNewUser(req)
        }
        if (req.user.authIntent === 'login') {
            return await this.authService.login(req, res)
        }
    }

    @Post('logout')
    @UseGuards(ValidateToken)
    async logout(@Req() req: _Request, @Res() res: Response) {
        return await this.authService.logout(req, res)
    }
}
