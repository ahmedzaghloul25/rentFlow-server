import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { ValidateToken } from 'common/guards';
import type { _Request } from 'common/types';
import { ClientDto } from './DTO';
import { ValidateClient } from 'common/pipes';
import type { ClientDoc } from 'src/DB/schema';

@Controller('clients')
@UseGuards(ValidateToken)
export class ClientController {
    constructor(private clientService: ClientService) { }

    @Post()
    async addNewClient(@Req() req: _Request, @Body() body: ClientDto) {
        return await this.clientService.addNewClient(req, body)
    }

    @Delete(':clientId')
    async deleteClient(@Req() req: _Request, @Param('clientId', ValidateClient) client: ClientDoc) {
        return await this.clientService.deleteClient(req, client)
    }

    @Get()
    async getAllClients(@Req() req: _Request, @Query('page') page: number, @Query('limit') limit: number) {
        return await this.clientService.getAllClients(req, page, limit)
    }

    @Get(':clientId')
    async getClientId(@Req() req: _Request, @Param('clientId') clientId: string) {
        return await this.clientService.getClient(req, clientId)
    }
}
