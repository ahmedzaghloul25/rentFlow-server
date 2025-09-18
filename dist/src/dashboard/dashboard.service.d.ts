import { Logger } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { _Request } from '../../common/types/types';
import { ContractRepo } from 'src/DB/repo/contractRepo';
import { PaymentRepo } from 'src/DB/repo/paymentRepo';
export declare class DashboardService {
    private readonly contractRepo;
    private readonly paymentRepo;
    private cache;
    private logger;
    constructor(contractRepo: ContractRepo, paymentRepo: PaymentRepo, cache: Cache, logger: Logger);
    getDuePayment(req: _Request): Promise<{}>;
    getFinancialData(req: _Request): Promise<{}>;
}
