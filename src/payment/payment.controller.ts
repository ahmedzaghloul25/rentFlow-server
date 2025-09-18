import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ValidateToken } from 'common/guards';
import type { _Request } from '../../common/types/types';
import { MarkPaymentPaidDto, PaymentsQueryFilter } from './DTO';

@Controller('payments')
@UseGuards(ValidateToken)
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    @Post(':paymentId')
    async markPaymentPaid(
        @Param('paymentId') paymentId: string,
        @Req() req: _Request,
        @Body() body: MarkPaymentPaidDto
    ) {
        return await this.paymentService.markPaymentPaid(paymentId, req, body)
    }

    @Get(':contractId')
    async getContractPayments(
        @Param('contractId') contractId: string,
        @Req() req: _Request,
        @Query() filters: PaymentsQueryFilter
    ) {
        return await this.paymentService.getContractPayments(contractId, req, filters)
    }
}
