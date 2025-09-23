import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';
import { ClientModule } from './client/client.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ContractModule } from './contract/contract.module';
import { PaymentModule } from './payment/payment.module';
import { APP_CONSTANTS } from '../common/constants/constants';
import { DashboardModule } from './dashboard/dashboard.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./.env",
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_ONLINE')
      }),
      inject: [ConfigService]
    }),
    CacheModule.register({ ttl: APP_CONSTANTS.CACHE_TTL, isGlobal: true }),
    AuthModule,
    PropertyModule,
    ClientModule,
    ContractModule,
    PaymentModule,
    DashboardModule,
    CronModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
