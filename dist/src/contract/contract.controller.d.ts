import { ContractService } from './contract.service';
import type { _Request } from 'common/types';
import type { PropertyDoc } from 'src/DB/schema';
import { ContractQueryFilter, CreateNewContract } from './DTO';
export declare class ContractController {
    private contractService;
    constructor(contractService: ContractService);
    createContract(req: _Request, property: PropertyDoc, body: CreateNewContract): Promise<{
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
    getAllContracts(req: _Request, filtersDto: ContractQueryFilter): Promise<{}>;
    getContract(req: _Request, contractId: string): Promise<{
        message: string;
        contract: {};
    } | undefined>;
}
