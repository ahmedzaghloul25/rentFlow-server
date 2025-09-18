import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";
import { IsFutureDate } from "common/decorators";
import { PaymentInterval } from "../../../common/types/types";
import { Types } from "mongoose";


export class CreateNewContract {

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    @IsFutureDate()
    end_date: Date

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    start_date: Date

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    initial_rent: number

    @IsNotEmpty()
    @IsEnum(PaymentInterval)
    payment_interval: number

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(100)
    annual_increase: number

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    security_deposit: number

    @IsMongoId()
    @IsNotEmpty()
    @Type(() => Types.ObjectId)
    client_id: Types.ObjectId
}

export class ContractQueryFilter {
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @IsFutureDate()
    end_date?: Date

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    start_date?: Date

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    is_terminated?: boolean

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