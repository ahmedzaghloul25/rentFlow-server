import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.ms(),
  nestWinstonModuleUtilities.format.nestLike('RentFlow', {
    colors: true,
    prettyPrint: true,
  }),
);

export const WinstonLogger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: process.env.MODE === 'DEV' ? consoleFormat : logFormat,
      }),
    ],
  });

