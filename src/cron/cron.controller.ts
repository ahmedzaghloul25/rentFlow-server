import { Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('cron')
export class CronController {
    constructor(private cronService: CronService) { }

    @Post('terminate-contracts')
    async terminateExpiredContracts(@Headers('authorization') authHeader: string
    ) {
        const cronSecret = process.env.CRON_SECRET;

        if (`Bearer ${cronSecret}` !== authHeader) {
            throw new UnauthorizedException('Invalid cron secret.');
        }

        return await this.cronService.autoTerminateContracts();
    }

    @Post('create-payments')
    async createPaymentRecords(@Headers('authorization') authHeader: string
    ) {
        const cronSecret = process.env.CRON_SECRET;

        if (`Bearer ${cronSecret}` !== authHeader) {
            throw new UnauthorizedException('Invalid cron secret.');
        }

        return await this.cronService.autoCreateRemainingPayments();
    }
}
