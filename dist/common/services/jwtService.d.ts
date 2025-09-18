import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "jsonwebtoken";
import { UserDoc } from "../../src/DB/schema/user.schema";
export declare class JwtToken {
    private jwtService;
    constructor(jwtService: JwtService);
    createToken(user: UserDoc): Promise<string>;
    verifyToken(token: string): Promise<Partial<UserDoc> & JwtPayload>;
}
