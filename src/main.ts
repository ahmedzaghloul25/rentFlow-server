import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import { WinstonLogger } from 'common/logger';
import { APP_CONSTANTS } from 'common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger : WinstonLogger
  });
  const port = process.env.PORT ?? 3000
  app.enableCors({
    origin: APP_CONSTANTS.CLIENT_URL,
    credentials: true,
  })
  app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: APP_CONSTANTS.SESSION_EXPIRE },
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true
  }))
  
  app.use(cookieParser(process.env.COOKIE_SECRET as string))
  await app.listen(port, () => {
    console.log('server is running using port ', port);
  });
}
bootstrap();
