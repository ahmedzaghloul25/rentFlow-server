import { HydratedDocument, Types } from "mongoose";
export declare class Payment {
    contract_id: Types.ObjectId;
    user_id: Types.ObjectId;
    due_date: Date;
    due_amount: number;
    amount_paid: number;
    is_paid: boolean;
    payment_date: Date;
    is_cancelled: boolean;
    payment_method: string;
}
export declare const paymentSchema: import("mongoose").Schema<Payment, import("mongoose").Model<Payment, any, any, any, import("mongoose").Document<unknown, any, Payment, any, {}> & Payment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Payment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Payment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Payment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const paymentModule: import("@nestjs/common").DynamicModule;
export type PaymentDoc = HydratedDocument<Payment>;
