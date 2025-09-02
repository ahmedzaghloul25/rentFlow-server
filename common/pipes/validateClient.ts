import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform, UnauthorizedException } from "@nestjs/common";
import { ClientRepo } from "src/DB/repo";


@Injectable()
export class ValidateClient implements PipeTransform {
    constructor(private clientRepo: ClientRepo) { }

    async transform(value: string, metadata: ArgumentMetadata) {
        if (!value) throw new UnauthorizedException('CLIENT_ID_REQUIRED')
        const client = await this.clientRepo.findOneRecord({ _id: value, isDeleted: { $exists: false } })
        if(!client) throw new NotFoundException('CLIENT_NOT_FOUND')
        return client
    }
}