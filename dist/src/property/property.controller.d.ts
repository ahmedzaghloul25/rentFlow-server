import { PropertyService } from './property.service';
import type { _Request } from '../../common/types/types';
import { AddNewProperty } from './DTO/propertyDto';
import type { PropertyDoc } from '../DB/schema/property.schema';
export declare class PropertyController {
    private propertyService;
    constructor(propertyService: PropertyService);
    addNewProperty(req: _Request, body: AddNewProperty): Promise<{
        message: string;
        property: (import("mongoose").Document<unknown, {}, import("../DB/schema/property.schema").Property, {}, {}> & import("../DB/schema/property.schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | (import("mongoose").Document<unknown, {}, import("../DB/schema/property.schema").Property, {}, {}> & import("../DB/schema/property.schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    deleteProperty(property: PropertyDoc, req: _Request): Promise<{
        message: string;
        property: import("mongoose").Document<unknown, {}, import("../DB/schema/property.schema").Property, {}, {}> & import("../DB/schema/property.schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    getAllProperties(req: _Request, page: number, limit: number): Promise<{}>;
    getProperty(propertyId: string, req: _Request): Promise<{
        message: string;
        property: import("mongoose").Document<unknown, {}, import("../DB/schema/property.schema").Property, {}, {}> & import("../DB/schema/property.schema").Property & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
}
