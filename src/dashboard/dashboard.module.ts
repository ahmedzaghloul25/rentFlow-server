import { Logger, Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { contractModule, paymentModule, userModule } from 'src/DB/schema';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from 'common/services';
import { PaymentRepo } from 'src/DB/repo/paymentRepo';
import { ContractRepo } from 'src/DB/repo/contractRepo';
import { UserRepo } from 'src/DB/repo/userRepo';

@Module({
  imports: [paymentModule, contractModule, userModule],
  controllers: [DashboardController],
  providers: [DashboardService, PaymentRepo, ContractRepo, UserRepo, JwtService, JwtToken, Logger]
})
export class DashboardModule {}
