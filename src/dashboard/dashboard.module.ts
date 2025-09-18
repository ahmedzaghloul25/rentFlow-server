import { Logger, Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { contractModule } from '../DB/schema/contract.schema';
import { paymentModule } from '../DB/schema/payment.schema';
import { userModule } from '../DB/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from '../../common/services/jwtService';
import { PaymentRepo } from '../DB/repo/paymentRepo';
import { ContractRepo } from '../DB/repo/contractRepo';
import { UserRepo } from '../DB/repo/userRepo';

@Module({
  imports: [paymentModule, contractModule, userModule],
  controllers: [DashboardController],
  providers: [DashboardService, PaymentRepo, ContractRepo, UserRepo, JwtService, JwtToken, Logger]
})
export class DashboardModule {}
