import { Logger, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { userModule } from 'src/DB/schema';
import { UserRepo } from 'src/DB/repo/userRepo';
import { JwtToken } from 'common/services/jwtService';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[PassportModule, userModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy,UserRepo, JwtService, JwtToken, Logger]
})
export class AuthModule {}
