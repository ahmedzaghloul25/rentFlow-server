import { HydratedDocument, Types } from "mongoose";
export declare class Property {
    number: string;
    type: string;
    city: string;
    district: string;
    building: string;
    notes: string;
    user_id: Types.ObjectId;
    isDeleted: boolean;
}
export declare const propertySchema: import("mongoose").Schema<Property, import("mongoose").Model<Property, any, any, any, import("mongoose").Document<unknown, any, Property, any, {}> & Property & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Property, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Property>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Property> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const propertyModule: import("@nestjs/common").DynamicModule;
export type PropertyDoc = HydratedDocument<Property>;
