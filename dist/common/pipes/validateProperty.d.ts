import { PipeTransform } from "@nestjs/common";
import { PropertyRepo } from "src/DB/repo";
export declare class ValidateProperty implements PipeTransform {
    private propertyRepo;
    constructor(propertyRepo: PropertyRepo);
    transform(value: string): Promise<import("mongoose").Document<unknown, {}, import("../../src/DB/schema").Property, {}, {}> & import("../../src/DB/schema").Property & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
