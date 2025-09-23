import { MongooseModule, Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class User {
    @Prop({
        required: true,
        minlength: 3,
        maxlength: 100
    })
    firstName: string

    @Prop({
        required: true,
        minlength: 3,
        maxlength: 100
    })
    lastName: string

    @Prop({
        unique: true,
        required: true
    })
    email: string

    @Prop({
        minLength: 6,
        required: true
    })
    password: string

    @Prop({
        default: false
    })
    isLoggedIn: boolean

    @Virtual({
        get: function () {
            return `${this.firstName} ${this.lastName}`
        }
    })
    fullName: string
}

export const userSchema = SchemaFactory.createForClass(User)


export const userModule = MongooseModule.forFeature([
    { name: User.name, schema: userSchema }
])
export type UserDoc = HydratedDocument<User>