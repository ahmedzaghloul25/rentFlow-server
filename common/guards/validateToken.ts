import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { APP_CONSTANTS } from "../constants/constants";
import { JwtToken } from "../services/jwtService";
import { UserRepo } from "src/DB/repo/userRepo";


@Injectable()
export class ValidateToken implements CanActivate {
    constructor(private jewToken: JwtToken,
        private userRepo: UserRepo
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = request.signedCookies[APP_CONSTANTS.AUTH_TOKEN_NAME]
        if (!token) {
            throw new BadRequestException('TOKEN_NOT_FOUND')
        }
        const validation = await this.jewToken.verifyToken(token)
        const loggedInUser = await this.userRepo.findOneRecord({ _id: validation._id, isLoggedIn: true })
        if (!loggedInUser) {
            return false
        }
        request.user = loggedInUser
        return true
    }
}