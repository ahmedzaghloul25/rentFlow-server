import { Logger, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userModule } from '../DB/schema/user.schema';
import { UserRepo } from 'src/DB/repo/userRepo';
import { JwtToken } from '../../common/services/jwtService';
import { JwtService } from '@nestjs/jwt';
import { Hashing } from 'common/services/hash';

@Module({
  imports:[userModule],
  controllers: [AuthController],
  providers: [AuthService,UserRepo, JwtService, JwtToken, Logger, Hashing]
})
export class AuthModule {}
