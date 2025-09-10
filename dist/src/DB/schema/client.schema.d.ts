import { HydratedDocument, Types } from "mongoose";
export declare class Client {
    firstName: string;
    middleName: string;
    lastName: string;
    ID_no: string;
    phone: string;
    user_id: Types.ObjectId;
    fullName: string;
    isDeleted: boolean;
}
export declare const clientSchema: import("mongoose").Schema<Client, import("mongoose").Model<Client, any, any, any, import("mongoose").Document<unknown, any, Client, any, {}> & Client & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Client, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Client>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Client> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const clientModule: import("@nestjs/common").DynamicModule;
export type ClientDoc = HydratedDocument<Client>;
