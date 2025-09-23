import { registerDecorator, ValidationOptions } from "class-validator";

/**
 * validate that entered date is greater than today
 * @param validationOptions - validation options
 * @returns true if valid entry
 */
export function IsFutureDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isFutureDate',
            propertyName,
            target: object.constructor,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(value: Date) {
                    const now = new Date()
                    return value instanceof Date && value > now
                },
                defaultMessage() {
                    return "End Date should be greater than today"
                }
            }
        })
    }
}