import { Injectable } from "@nestjs/common";
import { DbRepo } from "./dbRepo";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Client, ClientDoc } from "../schema/client.schema";


@Injectable()
export class ClientRepo extends DbRepo<ClientDoc>{
    constructor(@InjectModel(Client.name) private clientModel : Model<ClientDoc>){
        super(clientModel)
    }
}