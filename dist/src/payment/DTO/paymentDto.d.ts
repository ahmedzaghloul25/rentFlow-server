export declare class MarkPaymentPaidDto {
    amount_paid: number;
    payment_method: string;
    payment_date: Date;
}
export declare class PaymentsQueryFilter {
    is_paid?: boolean;
    is_cancelled?: boolean;
    page?: number;
    limit?: number;
}
