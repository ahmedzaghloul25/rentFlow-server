import { HydratedDocument, Types } from "mongoose";
export declare class Contract {
    property_id: Types.ObjectId;
    user_id: Types.ObjectId;
    client_id: Types.ObjectId;
    end_date: Date;
    start_date: Date;
    actual_end_date: Date;
    is_terminated: boolean;
    initial_rent: number;
    payment_interval: number;
    annual_increase: number;
    security_deposit: number;
    isPaymentsCreated: boolean;
}
export declare const contractSchema: import("mongoose").Schema<Contract, import("mongoose").Model<Contract, any, any, any, import("mongoose").Document<unknown, any, Contract, any, {}> & Contract & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Contract, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Contract>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Contract> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const contractModule: import("@nestjs/common").DynamicModule;
export type ContractDoc = HydratedDocument<Contract>;
