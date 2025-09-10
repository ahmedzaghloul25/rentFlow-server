import { PipeTransform } from "@nestjs/common";
import { ClientRepo } from "src/DB/repo";
export declare class ValidateClient implements PipeTransform {
    private clientRepo;
    constructor(clientRepo: ClientRepo);
    transform(value: string): Promise<import("mongoose").Document<unknown, {}, import("../../src/DB/schema").Client, {}, {}> & import("../../src/DB/schema").Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
