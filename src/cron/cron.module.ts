import { Logger, Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { ContractRepo, PaymentRepo } from 'src/DB/repo';
import { contractModule, paymentModule } from 'src/DB/schema';

@Module({
  imports:[paymentModule, contractModule],
  providers: [CronService, ContractRepo, PaymentRepo, Logger],
  controllers: [CronController]
})
export class CronModule {}
