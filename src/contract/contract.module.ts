import { Logger, Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { contractModule, paymentModule, propertyModule, userModule } from 'src/DB/schema';
import { ContractRepo, PaymentRepo, PropertyRepo, UserRepo } from 'src/DB/repo';
import { JwtToken } from 'common/services';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [contractModule, paymentModule, userModule, propertyModule],
  controllers: [ContractController],
  providers: [ContractService, ContractRepo, PaymentRepo, PropertyRepo, Logger, UserRepo, JwtToken, JwtService],
  exports: [ContractRepo]
})
export class ContractModule { }
