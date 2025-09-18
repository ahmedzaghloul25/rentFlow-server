import { Logger, Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { contractModule, paymentModule, userModule } from 'src/DB/schema';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from 'common/services';
import { PaymentRepo } from 'src/DB/repo/payment.repo';
import { ContractRepo } from 'src/DB/repo/contract.repo';
import { UserRepo } from 'src/DB/repo/user.repo';

@Module({
  imports: [paymentModule, contractModule, userModule],
  controllers: [DashboardController],
  providers: [DashboardService, PaymentRepo, ContractRepo, UserRepo, JwtService, JwtToken, Logger]
})
export class DashboardModule {}
