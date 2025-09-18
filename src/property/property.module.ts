import { Logger, Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { contractModule } from '../DB/schema/contract.schema';
import { propertyModule } from '../DB/schema/property.schema';
import { userModule } from '../DB/schema/user.schema';
import { JwtToken } from '../../common/services/jwtService';
import { JwtService } from '@nestjs/jwt';
import { PropertyRepo } from '../DB/repo/propertyRepo';
import { ContractRepo } from '../DB/repo/contractRepo';
import { UserRepo } from '../DB/repo/userRepo';

@Module({
  imports: [propertyModule, userModule, contractModule],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepo, ContractRepo, UserRepo, JwtToken, JwtService, Logger],
  exports:[ContractRepo, Logger]
})
export class PropertyModule { }
