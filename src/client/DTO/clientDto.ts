import { IsAlpha, IsNumberString, MaxLength, MinLength } from "class-validator";


export class ClientDto{

    @IsAlpha()
    @MinLength(3)
    @MaxLength(50)
    firstName: string


    @IsAlpha()
    @MinLength(3)
    @MaxLength(50)
    middleName: string


    @IsAlpha()
    @MinLength(3)
    @MaxLength(50)
    lastName: string

    @IsNumberString()
    @MinLength(14)
    @MaxLength(14)
    ID_no: string


    @IsNumberString()
    @MinLength(11)
    @MaxLength(11)
    phone: string

}