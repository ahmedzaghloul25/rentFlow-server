import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Property } from "./property.schema";
import { HydratedDocument, Types } from "mongoose";
import { User } from "./user.schema";
import { Client } from "./client.schema";
import { PaymentInterval } from "../../../common/types/types";


@Schema({ timestamps: true })
export class Contract {
    @Prop({
        ref: Property.name,
        required: true,
        type: Types.ObjectId
    })
    property_id: Types.ObjectId

    @Prop({
        ref: User.name,
        required: true,
        type: Types.ObjectId
    })
    user_id: Types.ObjectId

    @Prop({
        ref: Client.name,
        required: true,
        type: Types.ObjectId
    })
    client_id: Types.ObjectId

    @Prop({
        required: true
    })
    end_date: Date

    @Prop({
        required: true
    })
    start_date: Date

    @Prop()
    actual_end_date: Date

    @Prop({
        default: false
    })
    is_terminated: boolean

    @Prop({
        required: true,
        min: 1
    })
    initial_rent: number

    @Prop({
        required: true,
        enum: PaymentInterval
    })
    payment_interval: number

    @Prop({
        min: 0,
        max: 100
    })
    annual_increase: number

    @Prop({
        min: 0,
    })
    security_deposit: number

    @Prop({
        type: Boolean,
        default: false
    })
    isPaymentsCreated: boolean

}

export const contractSchema = SchemaFactory.createForClass(Contract)
export const contractModule = MongooseModule.forFeature([
    { name: Contract.name, schema: contractSchema }
])
export type ContractDoc = HydratedDocument<Contract>