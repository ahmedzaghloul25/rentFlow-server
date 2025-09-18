import { Body, Controller, Get, HttpCode, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ValidateToken } from '../../common/guards/validateToken';
import type { _Request } from '../../common/types/types';
import { ValidateProperty } from '../../common/pipes/validateProperty';
import type { PropertyDoc } from '../DB/schema/property.schema';
import { ContractQueryFilter, CreateNewContract } from './DTO/contractDto';

@Controller('contracts')
@UseGuards(ValidateToken)
export class ContractController {
    constructor(private contractService: ContractService) { }

    @Post(':propertyId')
    @HttpCode(201)
    async createContract(
        @Req() req: _Request,
        @Param('propertyId', ValidateProperty) property: PropertyDoc,
        @Body() body: CreateNewContract) {
        return await this.contractService.createNewContract(req, property, body)
    }

    @Post('terminate/:contractId')
    @HttpCode(200)
    async terminateContract(@Req() req: _Request, @Param('contractId') contractId: string) {
        return await this.contractService.terminateContract(req, contractId)
    }

    @Get()
    @HttpCode(200)
    async getAllContracts(@Req() req: _Request, @Query() filtersDto: ContractQueryFilter) {
        const { page, limit, ...filters } = filtersDto
        return await this.contractService.getAllContracts(req, filters, page, limit)
    }

    @Get(':contractId')
    @HttpCode(200)
    async getContract(@Req() req: _Request, @Param('contractId') contractId: string) {
        return await this.contractService.getContract(req, contractId)
    }
}
