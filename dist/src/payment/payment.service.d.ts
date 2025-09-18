import { Logger } from '@nestjs/common';
import { _Request } from '../../common/types/types';
import { PaymentRepo } from '../DB/repo/paymentRepo';
import { MarkPaymentPaidDto, PaymentsQueryFilter } from './DTO/paymentDto';
import { Types } from 'mongoose';
import type { Cache } from 'cache-manager';
export declare class PaymentService {
    private readonly paymentRepo;
    private logger;
    private cache;
    constructor(paymentRepo: PaymentRepo, logger: Logger, cache: Cache);
    markPaymentPaid(paymentId: string, req: _Request, body: MarkPaymentPaidDto): Promise<{
        message: string;
        payment: (import("mongoose").Document<unknown, {}, import("../DB/schema/payment.schema").Payment, {}, {}> & import("../DB/schema/payment.schema").Payment & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    getContractPayments(contractId: string, req: _Request, filters: PaymentsQueryFilter): Promise<{}>;
}
