import { Injectable } from "@nestjs/common";
import { DbRepo } from "./dbRepo";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDoc } from "../schema/user.schema";


@Injectable()
export class UserRepo extends DbRepo<UserDoc> {
    constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {
        super(userModel)
    }

}