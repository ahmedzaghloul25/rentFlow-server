import { Logger, Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { ContractRepo } from '../DB/repo/contractRepo';
import { contractModule } from '../DB/schema/contract.schema';
import { paymentModule } from '../DB/schema/payment.schema';
import { PaymentRepo } from '../DB/repo/paymentRepo';

@Module({
  imports:[paymentModule, contractModule],
  providers: [CronService, ContractRepo, PaymentRepo, Logger],
  controllers: [CronController]
})
export class CronModule {}
