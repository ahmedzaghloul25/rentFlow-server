import { Injectable } from "@nestjs/common";
import { DbRepo } from "./dbRepo";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Contract, ContractDoc } from "../schema/contract.schema";


@Injectable()
export class ContractRepo extends DbRepo<ContractDoc>{
    constructor(@InjectModel(Contract.name) private contractModel : Model<ContractDoc>){
        super(contractModel)
    }
}