import { Logger, Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { contractModule, propertyModule, userModule } from 'src/DB/schema';
import { JwtToken } from 'common/services';
import { JwtService } from '@nestjs/jwt';
import { PropertyRepo } from 'src/DB/repo/propertyRepo';
import { ContractRepo } from 'src/DB/repo/contractRepo';
import { UserRepo } from 'src/DB/repo/userRepo';

@Module({
  imports: [propertyModule, userModule, contractModule],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepo, ContractRepo, UserRepo, JwtToken, JwtService, Logger],
  exports:[ContractRepo, Logger]
})
export class PropertyModule { }
