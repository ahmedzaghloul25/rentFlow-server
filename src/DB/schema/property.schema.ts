import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { EgyptianCity, PropertyType } from "../../../common/types/types";
import { User } from "./user.schema";

@Schema({ timestamps: true })
export class Property {
    @Prop({
        required: true,
        minlength: 1,
        maxlength: 10
    })
    number: string

    @Prop({
        enum: PropertyType,
        required: true
    })
    type: string

    @Prop({
        enum: EgyptianCity,
        required: true
    })
    city: string

    @Prop({
        required: true
    })
    district: string

    @Prop({
        required: true
    })
    building: string

    @Prop({
        maxLength: 200
    })
    notes: string

    @Prop({
        type: Types.ObjectId,
        ref: User.name
    })
    user_id: Types.ObjectId

    @Prop()
    isDeleted: boolean
}

export const propertySchema = SchemaFactory.createForClass(Property)
propertySchema.index({ number: 1, district: 1 }, { unique: true })
export const propertyModule = MongooseModule.forFeature([
    { name: Property.name, schema: propertySchema }
])
export type PropertyDoc = HydratedDocument<Property>