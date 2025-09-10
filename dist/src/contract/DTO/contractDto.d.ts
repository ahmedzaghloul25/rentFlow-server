import { Types } from "mongoose";
export declare class CreateNewContract {
    end_date: Date;
    start_date: Date;
    initial_rent: number;
    payment_interval: number;
    annual_increase: number;
    security_deposit: number;
    client_id: Types.ObjectId;
}
export declare class ContractQueryFilter {
    end_date?: Date;
    start_date?: Date;
    is_terminated?: boolean;
    page?: number;
    limit?: number;
}
