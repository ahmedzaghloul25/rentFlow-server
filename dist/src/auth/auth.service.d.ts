import { Logger } from '@nestjs/common';
import { UserRepo } from 'src/DB/repo/user.repo';
import { _Request, GoogleReq } from 'common/types';
import { JwtToken } from 'common/services/jwtService';
import { Response } from 'express';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtToken;
    private logger;
    constructor(userRepo: UserRepo, jwtToken: JwtToken, logger: Logger);
    googleAuth(req: GoogleReq, res: Response): Promise<void>;
    logout(req: _Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
