import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PropertyService } from './property.service';
import { ValidateToken } from '../../common/guards/validateToken';
import type { _Request } from '../../common/types/types';
import { AddNewProperty } from './DTO/propertyDto';
import { ValidateProperty } from '../../common/pipes/validateProperty';
import type { PropertyDoc } from '../DB/schema/property.schema';

@Controller('properties')
@UseGuards(ValidateToken)
export class PropertyController {
    constructor(private propertyService: PropertyService) { }


    @Post()
    async addNewProperty(@Req() req: _Request, @Body() body: AddNewProperty) {
        return await this.propertyService.addNewProperty(req, body)
    }

    @Delete(':propertyId')
    async deleteProperty(@Param('propertyId', ValidateProperty) property: PropertyDoc, @Req() req: _Request) {
        return await this.propertyService.deleteProperty(property, req)
    }

    @Get()
    async getAllProperties(@Req() req: _Request, @Query('page') page: number, @Query('limit') limit: number) {
        return await this.propertyService.getAllProperties(req, page, limit)
    }

    @Get(':propertyId')
    async getProperty(@Param('propertyId') propertyId: string, @Req() req: _Request) {
        return await this.propertyService.getProperty(propertyId, req)
    }
}
