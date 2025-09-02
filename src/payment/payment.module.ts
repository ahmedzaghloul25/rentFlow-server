import { Logger, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { paymentModule, userModule } from 'src/DB/schema';
import { PaymentRepo, UserRepo } from 'src/DB/repo';
import { JwtToken } from 'common/services';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [paymentModule, userModule],
  providers: [PaymentService, PaymentRepo, Logger, JwtToken, JwtService, UserRepo],
  controllers: [PaymentController],
  exports: [PaymentRepo]
})
export class PaymentModule {}
