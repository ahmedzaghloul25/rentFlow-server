import { PropertyService } from './property.service';
import type { _Request } from '../../common/types/types';
import { AddNewProperty } from './DTO/propertyDto';
import type { PropertyDoc } from 'src/DB/schema';
export declare class PropertyController {
    private propertyService;
    constructor(propertyService: PropertyService);
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
    getAllProperties(req: _Request, page: number, limit: number): Promise<{}>;
    getProperty(propertyId: string, req: _Request): Promise<{
        message: string;
        property: import("mongoose").Document<unknown, {}, import("src/DB/schema").Property, {}, {}> & import("src/DB/schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
}
