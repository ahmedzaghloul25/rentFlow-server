import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ValidateToken } from 'common/guards';
import type { _Request } from 'common/types';

@Controller('dashboard')
@UseGuards(ValidateToken)
export class DashboardController {
    constructor(private readonly dashboardService : DashboardService){}

    @Get('duePayment')
    async getDuePayment(@Req() req : _Request){
        return await this.dashboardService.getDuePayment(req)
    }

    @Get('finance')
    async getFinancialData(@Req() req : _Request){
        return await this.dashboardService.getFinancialData(req)
    }
}
