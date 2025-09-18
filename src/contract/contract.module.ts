import { Logger, Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { contractModule, paymentModule, propertyModule, userModule } from 'src/DB/schema';
import { JwtToken } from 'common/services';
import { JwtService } from '@nestjs/jwt';
import { ContractRepo } from 'src/DB/repo/contract.repo';
import { PaymentRepo } from 'src/DB/repo/payment.repo';
import { PropertyRepo } from 'src/DB/repo/property.repo';
import { UserRepo } from 'src/DB/repo/user.repo';

@Module({
  imports: [contractModule, paymentModule, userModule, propertyModule],
  controllers: [ContractController],
  providers: [ContractService, ContractRepo, PaymentRepo, PropertyRepo, Logger, UserRepo, JwtToken, JwtService],
  exports: [ContractRepo]
})
export class ContractModule { }
