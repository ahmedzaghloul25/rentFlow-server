import { Logger } from '@nestjs/common';
import { AddNewProperty } from './DTO/propertyDto';
import { _Request } from 'common/types';
import { ContractRepo, PropertyRepo } from 'src/DB/repo';
import { Cache } from '@nestjs/cache-manager';
import { PropertyDoc } from 'src/DB/schema';
export declare class PropertyService {
    private readonly propertyRepo;
    private cache;
    private readonly contractRepo;
    private logger;
    constructor(propertyRepo: PropertyRepo, cache: Cache, contractRepo: ContractRepo, logger: Logger);
    addNewProperty(req: _Request, body: AddNewProperty): Promise<{
        message: string;
        property: (import("mongoose").Document<unknown, {}, import("src/DB/schema").Property, {}, {}> & import("src/DB/schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | (import("mongoose").Document<unknown, {}, import("src/DB/schema").Property, {}, {}> & import("src/DB/schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    deleteProperty(property: PropertyDoc, req: _Request): Promise<{
        message: string;
        property: import("mongoose").Document<unknown, {}, import("src/DB/schema").Property, {}, {}> & import("src/DB/schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    getAllProperties(req: _Request, page?: number, limit?: number): Promise<{}>;
    getProperty(propertyId: string, req: _Request): Promise<{
        message: string;
        property: import("mongoose").Document<unknown, {}, import("src/DB/schema").Property, {}, {}> & import("src/DB/schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
}
