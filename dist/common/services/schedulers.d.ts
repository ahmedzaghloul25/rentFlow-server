import { Logger } from "@nestjs/common";
import { ContractRepo, PaymentRepo } from "src/DB/repo";
export declare class Schedulers {
    private readonly contractRepo;
    private logger;
    private readonly paymentRepo;
    constructor(contractRepo: ContractRepo, logger: Logger, paymentRepo: PaymentRepo);
    private calculateMonthsDifference;
    private addMonthsToDate;
    autoTerminateContracts(): Promise<void>;
    autoCreateRemainingPayments(): Promise<void>;
}
