import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
import { PaymentMethodEnum } from "common/types";


export class MarkPaymentPaidDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount_paid: number

    @IsNotEmpty()
    @IsEnum(PaymentMethodEnum)
    @Transform(({ value }) => { return value.toUpperCase() })
    payment_method: string

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    payment_date: Date
}

export class PaymentsQueryFilter {

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    is_paid?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    is_cancelled?: boolean

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(5)
    @Type(() => Number)
    limit?: number = 10;
}