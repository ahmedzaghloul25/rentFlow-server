import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class Hashing {
  private salt = Number(process.env.SALT_ROUND);
  constructor() {}
  createHash(data: string): string {
    return bcrypt.hashSync(data, this.salt);
  }
  verifyHash(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash);
  }
  compareHash(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash);
  }
}