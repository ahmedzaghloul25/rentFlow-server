import { Logger, Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { contractModule } from '../DB/schema/contract.schema';
import { paymentModule } from '../DB/schema/payment.schema';
import { userModule } from '../DB/schema/user.schema';
import { propertyModule } from '../DB/schema/property.schema';
import { JwtToken } from '../../common/services/jwtService';
import { JwtService } from '@nestjs/jwt';
import { ContractRepo } from 'src/DB/repo/contractRepo';
import { PaymentRepo } from 'src/DB/repo/paymentRepo';
import { PropertyRepo } from 'src/DB/repo/propertyRepo';
import { UserRepo } from 'src/DB/repo/userRepo';

@Module({
  imports: [contractModule, paymentModule, userModule, propertyModule],
  controllers: [ContractController],
  providers: [ContractService, ContractRepo, PaymentRepo, PropertyRepo, Logger, UserRepo, JwtToken, JwtService],
  exports: [ContractRepo]
})
export class ContractModule { }
