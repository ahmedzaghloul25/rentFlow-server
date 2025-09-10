import { DbRepo } from "./db.repo";
import { Model } from "mongoose";
import { ContractDoc } from "../schema";
export declare class ContractRepo extends DbRepo<ContractDoc> {
    private contractModel;
    constructor(contractModel: Model<ContractDoc>);
}
