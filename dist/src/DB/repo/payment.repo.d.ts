import { DbRepo } from "./db.repo";
import { Model } from "mongoose";
import { PaymentDoc } from "../schema";
export declare class PaymentRepo extends DbRepo<PaymentDoc> {
    private paymentModel;
    constructor(paymentModel: Model<PaymentDoc>);
}
