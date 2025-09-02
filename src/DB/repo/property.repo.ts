import { Injectable } from "@nestjs/common";
import { DbRepo } from "./db.repo";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Property, PropertyDoc } from "../schema";


@Injectable()
export class PropertyRepo extends DbRepo<PropertyDoc>{
    constructor(@InjectModel(Property.name) private propertyModel : Model<PropertyDoc>){
        super(propertyModel)
    }
}