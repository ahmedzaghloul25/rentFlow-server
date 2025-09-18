import { Logger } from '@nestjs/common';
import { _Request } from 'common/types';
import { PaymentRepo } from 'src/DB/repo/payment.repo';
import { MarkPaymentPaidDto, PaymentsQueryFilter } from './DTO';
import { Types } from 'mongoose';
import type { Cache } from 'cache-manager';
export declare class PaymentService {
    private readonly paymentRepo;
    private logger;
    private cache;
    constructor(paymentRepo: PaymentRepo, logger: Logger, cache: Cache);
    markPaymentPaid(paymentId: string, req: _Request, body: MarkPaymentPaidDto): Promise<{
        message: string;
        payment: (import("mongoose").Document<unknown, {}, import("../DB/schema").Payment, {}, {}> & import("../DB/schema").Payment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    getContractPayments(contractId: string, req: _Request, filters: PaymentsQueryFilter): Promise<{}>;
}
