import { DbRepo } from "./db.repo";
import { Model } from "mongoose";
import { ClientDoc } from "../schema";
export declare class ClientRepo extends DbRepo<ClientDoc> {
    private clientModel;
    constructor(clientModel: Model<ClientDoc>);
}
