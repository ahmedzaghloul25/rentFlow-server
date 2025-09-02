import { Injectable } from "@nestjs/common";
import { DbRepo } from "./db.repo";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Contract, ContractDoc } from "../schema";


@Injectable()
export class ContractRepo extends DbRepo<ContractDoc>{
    constructor(@InjectModel(Contract.name) private contractModel : Model<ContractDoc>){
        super(contractModel)
    }
}