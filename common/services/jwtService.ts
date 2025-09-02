import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { APP_CONSTANTS } from "common/constants";
import {JwtPayload } from "jsonwebtoken";
import { UserDoc } from "src/DB/schema";

@Injectable()
export class JwtToken {
  constructor(private jwtService: JwtService) {}

  async createToken(user: UserDoc) {
    const payload = {email: user.email, _id: user._id}
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_ACCESS,
      expiresIn: APP_CONSTANTS.JWT_EXPIRE
    });
    return token;
  }

  async verifyToken(token: string): Promise<Partial<UserDoc> & JwtPayload> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_ACCESS,
      });
      return payload;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedException("TOKEN_EXPIRED");
      }
      if (error.name === "JsonWebTokenError") {
        throw new UnauthorizedException("INVALID_TOKEN_FORMAT");
      }
      throw new UnauthorizedException("TOKEN_VERIFICATION_FAILED");
    }
  }
}