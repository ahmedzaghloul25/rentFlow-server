import { Logger } from '@nestjs/common';
import { UserRepo } from '../DB/repo/userRepo';
import { _Request } from '../../common/types/types';
import { JwtToken } from '../../common/services/jwtService';
import { Response } from 'express';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtToken;
    private logger;
    constructor(userRepo: UserRepo, jwtToken: JwtToken, logger: Logger);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    logout(req: _Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
