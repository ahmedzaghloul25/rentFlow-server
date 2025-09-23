import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtToken } from "../services/jwtService";
import { UserRepo } from "../../src/DB/repo/userRepo";

@Injectable()
export class ValidateToken implements CanActivate {
    constructor(
        private jwtToken: JwtToken,
        private userRepo: UserRepo
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();        
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('TOKEN_NOT_FOUND_OR_MALFORMED');
        }       
        const token = authHeader.split(' ')[1];
        const validation = await this.jwtToken.verifyToken(token);
        if (!validation) {
            throw new UnauthorizedException('INVALID_TOKEN');
        }
        const loggedInUser = await this.userRepo.findOneRecord({ _id: validation._id, isLoggedIn: true });
        if (!loggedInUser) {
            throw new UnauthorizedException('USER_NOT_FOUND_OR_NOT_LOGGED_IN');
        }
        request.user = loggedInUser;
        return true;
    }
}
