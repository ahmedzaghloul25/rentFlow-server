import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PaymentMethodEnum } from "common/types";
import { HydratedDocument, Types } from "mongoose";
import { Contract } from "./contract.schema";
import { User } from "./user.schema";

@Schema({ timestamps: true })
export class Payment {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: Contract.name
    })
    contract_id: Types.ObjectId

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: User.name
    })
    user_id: Types.ObjectId

    @Prop({
        required: true
    })
    due_date: Date

    @Prop({
        required: true
    })
    due_amount: number

    @Prop()
    amount_paid: number

    @Prop({
        default: false
    })
    is_paid: boolean

    @Prop()
    payment_date: Date

    @Prop()
    is_cancelled: boolean

    @Prop({
        enum: PaymentMethodEnum,
    })
    payment_method: string
}

export const paymentSchema = SchemaFactory.createForClass(Payment)
export const paymentModule = MongooseModule.forFeature([
    { name: Payment.name, schema: paymentSchema }
])
export type PaymentDoc = HydratedDocument<Payment>