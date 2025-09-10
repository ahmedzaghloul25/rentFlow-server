import { DbRepo } from "./db.repo";
import { Model } from "mongoose";
import { PropertyDoc } from "../schema";
export declare class PropertyRepo extends DbRepo<PropertyDoc> {
    private propertyModel;
    constructor(propertyModel: Model<PropertyDoc>);
}
