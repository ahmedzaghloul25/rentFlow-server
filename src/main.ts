import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import { WinstonLogger } from 'common/logger';
import { APP_CONSTANTS } from 'common/constants';
import helmet from 'helmet';
import { doubleCsrfProtection } from 'config/csrf.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger
  });
  // const port = process.env.PORT ?? 3000;
  app.use(helmet());
  app.enableCors({
    origin: APP_CONSTANTS.CLIENT_URL,
    credentials: true,
  });
  app.use(cookieParser(process.env.COOKIE_SECRET as string));
  app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: APP_CONSTANTS.SESSION_EXPIRE },
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(doubleCsrfProtection);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.init();
  return app
  // await app.listen(port, () => {
  //   console.log('server is running using port ', port);
  // });
}
// bootstrap()

let appInstance: any;

export default async (req: any, res: any) => {
  if (!appInstance) {
    appInstance = await bootstrap();
  }
  return appInstance.getHttpAdapter().getInstance()(req, res);
};