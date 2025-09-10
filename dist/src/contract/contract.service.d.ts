import { _Request } from 'common/types';
import { ContractRepo, PaymentRepo } from 'src/DB/repo';
import { PropertyDoc } from 'src/DB/schema';
import { Logger } from '@nestjs/common';
import { CreateNewContract } from './DTO';
import type { Cache } from 'cache-manager';
export declare class ContractService {
    private readonly contractRepo;
    private readonly paymentRepo;
    private logger;
    private cache;
    constructor(contractRepo: ContractRepo, paymentRepo: PaymentRepo, logger: Logger, cache: Cache);
    createNewContract(req: _Request, property: PropertyDoc, body: CreateNewContract): Promise<{
        message: string;
        contract: {
            _id: import("mongoose").Types.ObjectId;
            end_date: Date;
            start_date: Date;
            property: import("mongoose").Types.ObjectId;
            client: import("mongoose").Types.ObjectId;
        };
    }>;
    terminateContract(req: _Request, contractId: string): Promise<{
        message: string;
        contract: {
            _id: import("mongoose").Types.ObjectId;
            isTerminated: boolean;
            startDate: Date;
            endDate: Date;
            actualEndDate: Date;
        };
    }>;
    getAllContracts(req: _Request, filters?: any, page?: number, limit?: number): Promise<{}>;
    getContract(req: _Request, contractId: string): Promise<{
        message: string;
        contract: {};
    } | undefined>;
}
