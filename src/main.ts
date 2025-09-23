
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WinstonLogger } from '../common/logger/winston.config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger
  });
  const port = process.env.PORT ?? 3000;
  app.use(helmet());
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
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
