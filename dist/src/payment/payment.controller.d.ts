import { PaymentService } from './payment.service';
import type { _Request } from '../../common/types/types';
import { MarkPaymentPaidDto, PaymentsQueryFilter } from './DTO/paymentDto';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    markPaymentPaid(paymentId: string, req: _Request, body: MarkPaymentPaidDto): Promise<{
        message: string;
        payment: (import("mongoose").Document<unknown, {}, import("../DB/schema/payment.schema").Payment, {}, {}> & import("../DB/schema/payment.schema").Payment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    getContractPayments(contractId: string, req: _Request, filters: PaymentsQueryFilter): Promise<{}>;
}
