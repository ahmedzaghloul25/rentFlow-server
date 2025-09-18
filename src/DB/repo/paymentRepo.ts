import { Injectable } from "@nestjs/common";
import { DbRepo } from "./dbRepo";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Payment, PaymentDoc } from "../schema";


@Injectable()
export class PaymentRepo extends DbRepo<PaymentDoc> {
    constructor(@InjectModel(Payment.name) private paymentModel: Model<PaymentDoc>) {
        super(paymentModel)
    }
}