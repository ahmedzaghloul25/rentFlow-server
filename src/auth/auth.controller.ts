import { Body, Controller, Get, InternalServerErrorException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { _Request } from '../../common/types/types';
import type { Response } from 'express';
import { ValidateToken } from '../../common/guards/validateToken';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
    ) { }

    @Post('register')
    async register(@Body() body: { email: string, password: string, firstName: string, lastName: string, secret: string }) {
        return await this.authService.register(body)
    }
    
    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        return await this.authService.login(body)
    }

    @Get('profile')
    @UseGuards(ValidateToken)
    getProfile(@Req() req: _Request, @Res({ passthrough: true }) res: Response) {
        try {
            return {
                user: {
                    email: req.user.email,
                    fullName: req.user.fullName,
                    isLoggedIn: req.user.isLoggedIn
                }
            }
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
