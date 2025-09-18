import { BadRequestException } from "@nestjs/common";
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { cityDistrictMap } from "../../common/maps/district.map";

/**
 * decorator to validate the entered district is matched with selected city
 * @param validationOptions - validation options
 * @returns - true if valid entry
 */
export function IsCityDistrictMatch(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: any) {
        registerDecorator({
            name: 'isCityDistrictMatch',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: string, validationArguments: ValidationArguments) {
                    if(!value){
                        throw new BadRequestException('INVALID_DISTRICT_VALUE')
                    }
                    const obj = validationArguments.object as any
                    const city = obj.city                    
                    const relatedDistricts = cityDistrictMap.get(city) as Array<string>
                    if(!city || !relatedDistricts){
                        throw new BadRequestException("INVALID_CITY_VALUE")
                    }                    
                    return relatedDistricts.includes(value.toUpperCase())
                },
                defaultMessage() {
                    return "District is not matched with selected City"
                },
            }
        })
    }
}