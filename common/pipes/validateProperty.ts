import { Injectable, NotFoundException, PipeTransform, UnauthorizedException } from "@nestjs/common";
import { PropertyRepo } from "src/DB/repo/propertyRepo";


@Injectable()
export class ValidateProperty implements PipeTransform {
    constructor(private propertyRepo: PropertyRepo) { }

    async transform(value: string) {
        if (!value) throw new UnauthorizedException('PROPERTY_ID_REQUIRED')
        const property = await this.propertyRepo.findOneRecord({ _id: value, isDeleted: { $exists: false } })
        if(!property) throw new NotFoundException('PROPERTY_NOT_FOUND')
        return property
    }
}