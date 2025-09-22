import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtToken } from "../services/jwtService";
import { UserRepo } from "src/DB/repo/userRepo";
export declare class ValidateToken implements CanActivate {
    private jwtToken;
    private userRepo;
    constructor(jwtToken: JwtToken, userRepo: UserRepo);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
