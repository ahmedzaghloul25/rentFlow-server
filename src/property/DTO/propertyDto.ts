import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IsCityDistrictMatch } from "common/decorators/isCityDistrictMatch";
import { EgyptianCity, PropertyType } from "common/types";

export class AddNewProperty {

    @IsString()
    @MinLength(1)
    @MaxLength(10)
    number: string

    @IsEnum(PropertyType)
    @Transform(({ value }) => { return value.toUpperCase() })
    type: string

    @IsString()
    @IsEnum(EgyptianCity)
    @Transform(({ value }) => { return value.toUpperCase() })
    city: string;

    @IsString()
    @IsCityDistrictMatch()
    district: string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    building: string

    @IsOptional()
    @MaxLength(200)
    notes?: string
}
