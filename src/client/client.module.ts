import { Logger, Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { clientModule } from '../DB/schema/client.schema';
import { userModule } from '../DB/schema/user.schema';
import { contractModule } from '../DB/schema/contract.schema';

import { JwtToken } from '../../common/services/jwtService';
import { JwtService } from '@nestjs/jwt';
import { ClientRepo } from '../DB/repo/clientRepo';
import { ContractRepo } from '../DB/repo/contractRepo';
import { UserRepo } from '../DB/repo/userRepo';

@Module({
  imports: [clientModule, userModule, contractModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepo, ContractRepo, UserRepo, JwtToken, JwtService, Logger]
})
export class ClientModule { }
