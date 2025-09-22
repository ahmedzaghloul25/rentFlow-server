
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import { WinstonLogger } from '../common/logger/winston.config';
import helmet from 'helmet';
import { NextFunction, Request } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger
  });
  const port = process.env.PORT ?? 3000;
  app.use(helmet());
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cookie',
      'Set-Cookie',
      'X-CSRF-Token'
    ],
    exposedHeaders: ['Set-Cookie'],
  });
  app.use(cookieParser(process.env.COOKIE_SECRET as string));
  app.use(passport.initialize());
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('--- COOKIE DEBUGGER ---');
    console.log('Raw Cookies:', req.cookies);
    console.log('Signed Cookies:', req.signedCookies);
    console.log('--- END COOKIE DEBUGGER ---');
    next();
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(port, () => {
    console.log('server is running using port ', port);
  });
}
bootstrap()
