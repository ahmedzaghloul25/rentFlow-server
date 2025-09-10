import { Logger, Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { contractModule, paymentModule, userModule } from 'src/DB/schema';
import { ContractRepo, PaymentRepo, UserRepo } from 'src/DB/repo';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from 'common/services';

@Module({
  imports: [paymentModule, contractModule, userModule],
  controllers: [DashboardController],
  providers: [DashboardService, PaymentRepo, ContractRepo, UserRepo, JwtService, JwtToken, Logger]
})
export class DashboardModule {}
