import { Logger, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { userModule } from '../DB/schema/user.schema';
import { paymentModule } from '../DB/schema/payment.schema';
import { JwtToken } from '../../common/services/jwtService';
import { JwtService } from '@nestjs/jwt';
import { PaymentRepo } from '../DB/repo/paymentRepo';
import { UserRepo } from '../DB/repo/userRepo';

@Module({
  imports: [paymentModule, userModule],
  providers: [PaymentService, PaymentRepo, Logger, JwtToken, JwtService, UserRepo],
  controllers: [PaymentController],
  exports: [PaymentRepo]
})
export class PaymentModule {}
