import { MongooseModule, Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({ timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } })
export class Client {
    @Prop({
        required: true,
        minlength: 3,
        maxLength: 50
    })
    firstName: string

    @Prop({
        required: true,
        minlength: 3,
        maxLength: 50
    })
    middleName: string

    @Prop({
        required: true,
        minlength: 3,
        maxLength: 50
    })
    lastName: string

    @Prop({
        required: true,
        minLength: 14,
        maxlength: 14,
    })
    ID_no: string

    @Prop({
        required: true,
        maxLength: 11,
        minlength: 11,
    })
    phone: string

    @Prop({
        type: Types.ObjectId,
        required: true
    })
    user_id: Types.ObjectId

    @Virtual({
        get() {
            return `${this.firstName} ${this.middleName} ${this.lastName}`
        }
    })
    fullName: string

    @Prop()
    isDeleted: boolean
}

export const clientSchema = SchemaFactory.createForClass(Client)
clientSchema.index({ user_id: 1, ID_no: 1}, { unique: true })
export const clientModule = MongooseModule.forFeature([
    { name: Client.name, schema: clientSchema }
])
export type ClientDoc = HydratedDocument<Client>