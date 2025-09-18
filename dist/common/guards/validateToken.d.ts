import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtToken } from "common/services";
import { UserRepo } from "src/DB/repo/user.repo";
export declare class ValidateToken implements CanActivate {
    private jewToken;
    private userRepo;
    constructor(jewToken: JwtToken, userRepo: UserRepo);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
