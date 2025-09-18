import { Logger, Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { ContractRepo } from 'src/DB/repo/contractRepo';
import { contractModule, paymentModule } from 'src/DB/schema';
import { PaymentRepo } from 'src/DB/repo/paymentRepo';

@Module({
  imports:[paymentModule, contractModule],
  providers: [CronService, ContractRepo, PaymentRepo, Logger],
  controllers: [CronController]
})
export class CronModule {}
