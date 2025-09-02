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
      // Console transport for development
      new winston.transports.Console({
        format: process.env.MODE === 'DEV' ? consoleFormat : logFormat,
      }),
      
      // All logs file
      new winston.transports.DailyRotateFile({
        filename: 'logs/app-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
        maxSize: '20m',
        format: logFormat,
      }),
      
      // Error logs file
      new winston.transports.DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        maxFiles: '30d',
        maxSize: '20m',
        format: logFormat,
      }),
      
      // Info logs file  
      new winston.transports.DailyRotateFile({
        filename: 'logs/warn-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'warn',
        maxFiles: '30d',
        maxSize: '20m',
        format: logFormat,
      }),
    ],
  });

