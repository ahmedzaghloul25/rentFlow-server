import { Logger, Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { clientModule, contractModule, userModule } from 'src/DB/schema';

import { JwtToken } from 'common/services';
import { JwtService } from '@nestjs/jwt';
import { ClientRepo } from 'src/DB/repo/client.repo';
import { ContractRepo } from 'src/DB/repo/contract.repo';
import { UserRepo } from 'src/DB/repo/user.repo';

@Module({
  imports: [clientModule, userModule, contractModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepo, ContractRepo, UserRepo, JwtToken, JwtService, Logger]
})
export class ClientModule { }
