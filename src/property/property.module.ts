import { Logger, Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { contractModule, propertyModule, userModule } from 'src/DB/schema';
import { JwtToken } from 'common/services';
import { JwtService } from '@nestjs/jwt';
import { PropertyRepo } from 'src/DB/repo/property.repo';
import { ContractRepo } from 'src/DB/repo/contract.repo';
import { UserRepo } from 'src/DB/repo/user.repo';

@Module({
  imports: [propertyModule, userModule, contractModule],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepo, ContractRepo, UserRepo, JwtToken, JwtService, Logger],
  exports:[ContractRepo, Logger]
})
export class PropertyModule { }
