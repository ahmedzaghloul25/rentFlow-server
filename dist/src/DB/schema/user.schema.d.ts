import { HydratedDocument } from "mongoose";
export declare class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isLoggedIn: boolean;
    fullName: string;
}
export declare const userSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any, {}> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const userModule: import("@nestjs/common").DynamicModule;
export type UserDoc = HydratedDocument<User>;
