import type { Request } from "express"
import { Document, Types } from "mongoose"
import { UserDoc } from "../../src/DB/schema/user.schema"
import { ContractDoc } from "../../src/DB/schema/contract.schema";


export enum PaymentMethodEnum {
    CASH = 'CASH',
    BANK_TRANSFER = 'BANK',
    E_WALLET = 'E-WALLET'
}

export interface GoogleReq extends Request {
    user: {
        email: string,
        firstName: string,
        lastName: string,
        isVerified: boolean,
        picture?: string,
        authIntent: 'login' | 'signup'

    }
}

export interface _Request extends Request {
    user: UserDoc
}

export enum PropertyType {
    APARTMENT = 'APARTMENT',
    VILLA = 'VILLA',
    DUPLEX = 'DUPLEX',
    PENTHOUSE = 'PENTHOUSE',
    STUDIO = 'STUDIO',
    TOWNHOUSE = 'TOWNHOUSE',
    CHALET = 'CHALET',
    OFFICE = 'OFFICE',
    SHOP = 'SHOP',
    WAREHOUSE = 'WAREHOUSE',
    BUILDING = 'BUILDING',
    LAND = 'LAND',
    FARM = 'FARM',
    CLINIC = 'CLINIC',
    RESTAURANT = 'RESTAURANT',
    FACTORY = 'FACTORY',
    BARKING = 'BARKING'
}

export enum EgyptianCity {
    CAIRO = 'CAIRO',
    ALEXANDRIA = 'ALEXANDRIA',
    GIZA = 'GIZA',
    PORT_SAID = 'PORT_SAID',
    SUEZ = 'SUEZ',
    LUXOR = 'LUXOR',
    ASWAN = 'ASWAN',
    DAKAHLIA = 'DAKAHLIA',
    GHARBIA = 'GHARBIA',
    KAFR_EL_SHEIKH = 'KAFR_EL_SHEIKH',
    DAMIETTA = 'DAMIETTA',
    SHARQIA = 'SHARQIA',
    MONUFIA = 'MONUFIA',
    QALYUBIA = 'QALYUBIA',
    BEHEIRA = 'BEHEIRA',
    ISMAILIA = 'ISMAILIA',
    BENI_SUEF = 'BENI_SUEF',
    FAYOUM = 'FAYOUM',
    MINYA = 'MINYA',
    ASYUT = 'ASYUT',
    SOHAG = 'SOHAG',
    QENA = 'QENA',
    RED_SEA = 'RED_SEA',
    NEW_VALLEY = 'NEW_VALLEY',
    MATROUH = 'MATROUH',
    NORTH_SINAI = 'NORTH_SINAI',
    SOUTH_SINAI = 'SOUTH_SINAI'
}

export enum PaymentInterval {
    EVERY_MONTH = 1,
    EVERY_3_MONTHS = 3,
    EVERY_6_MONTH = 6,
    EVERY_YEAR = 12
}


export interface PaymentInterface extends Document{
    contract_id: Types.ObjectId
    due_date: Date
    due_amount: number
    amount_paid : number
    is_paid : boolean
    payment_date:  Date
    is_cancelled: boolean
    payment_method: string
}

export interface PopulatedPayment extends Omit<PaymentInterface, 'contract_id'>{
    contract_id : ContractDoc
}


