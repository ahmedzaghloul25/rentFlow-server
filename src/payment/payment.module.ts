import { Logger, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { paymentModule, userModule } from 'src/DB/schema';
import { JwtToken } from 'common/services';
import { JwtService } from '@nestjs/jwt';
import { PaymentRepo } from 'src/DB/repo/paymentRepo';
import { UserRepo } from 'src/DB/repo/userRepo';

@Module({
  imports: [paymentModule, userModule],
  providers: [PaymentService, PaymentRepo, Logger, JwtToken, JwtService, UserRepo],
  controllers: [PaymentController],
  exports: [PaymentRepo]
})
export class PaymentModule {}
