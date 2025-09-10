import { AuthService } from './auth.service';
import type { _Request, GoogleReq } from 'common/types';
import type { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleSignup(req: any, res: any): Promise<void>;
    googleLogin(req: any, res: any): Promise<void>;
    authGoogle(req: any): Promise<void>;
    googleAuthRedirect(req: GoogleReq, res: Response): Promise<void>;
    getProfile(req: _Request, res: Response): {
        user: import("mongoose").Document<unknown, {}, import("../DB/schema").User, {}, {}> & import("../DB/schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        csrfToken: string;
    };
    logout(req: _Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
