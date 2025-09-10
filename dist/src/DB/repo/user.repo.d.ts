import { DbRepo } from "./db.repo";
import { Model } from "mongoose";
import { UserDoc } from "../schema";
export declare class UserRepo extends DbRepo<UserDoc> {
    private userModel;
    constructor(userModel: Model<UserDoc>);
}
