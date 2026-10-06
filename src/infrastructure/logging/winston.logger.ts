import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config';

export interface LogMetadata {
  [key: string]: any;
}

@Injectable()
export class WinstonLogger implements LoggerService {
  private readonly logger: winston.Logger;
  private readonly isProduction: boolean;

  constructor(private readonly configService: ConfigService) {
    const logLevel = this.configService.get<string>('LOG_LEVEL') || 'info';
    const logFormat = this.configService.get<string>('LOG_FORMAT') || 'json';
    this.isProduction = this.configService.get<string>('NODE_ENV') === 'production';

    const transports: winston.transport[] = [
      new winston.transports.Console({
        level: logLevel,
        format: this.isProduction
          ? winston.format.combine(
              winston.format.timestamp(),
              winston.format.errors({ stack: true }),
              winston.format.json(),
            )
          : winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              winston.format.printf(({ timestamp, level, message, context, ...metadata }) => {
                let msg = `${timestamp} [${context || 'App'}] ${level}: ${message}`;
                if (Object.keys(metadata).length > 0) {
                  msg += ` ${JSON.stringify(metadata)}`;
                }
                return msg;
              }),
            ),
      }),
    ];

    if (this.isProduction) {
      transports.push(
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxSize: '20m',
          maxFiles: '14d',
          zippedArchive: true,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json(),
          ),
        }),
        new DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
          zippedArchive: true,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json(),
          ),
        }),
      );
    }

    this.logger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      defaultMeta: { service: 'loan-microservice' },
      transports,
      exitOnError: false,
    });
  }

  log(level: string, message: string, metadata?: LogMetadata): void {
    const logEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...metadata,
    };

    switch (level) {
      case 'error':
        this.logger.error(message, logEntry);
        break;
      case 'warn':
        this.logger.warn(message, logEntry);
        break;
      case 'info':
        this.logger.info(message, logEntry);
        break;
      case 'debug':
        this.logger.debug(message, logEntry);
        break;
      default:
        this.logger.info(message, logEntry);
    }
  }

  error(message: string, trace?: string, context?: string, metadata?: LogMetadata): void {
    this.logger.error(message, {
      trace,
      context,
      ...metadata,
    });
  }

  warn(message: string, context?: string, metadata?: LogMetadata): void {
    this.logger.warn(message, {
      context,
      ...metadata,
    });
  }

  http(message: string, metadata?: LogMetadata): void {
    this.logger.http(message, metadata);
  }

  verbose(message: string, context?: string, metadata?: LogMetadata): void {
    this.logger.verbose(message, {
      context,
      ...metadata,
    });
  }

  debug(message: string, context?: string, metadata?: LogMetadata): void {
    this.logger.debug(message, {
      context,
      ...metadata,
    });
  }

  silly(message: string, context?: string, metadata?: LogMetadata): void {
    this.logger.silly(message, {
      context,
      ...metadata,
    });
  }

  setLogLevels(levels: Record<string, string>): void {
    Object.keys(levels).forEach((key) => {
      this.logger.add(new winston.transports.Console({ level: levels[key] }));
    });
  }

  getLogger(): winston.Logger {
    return this.logger;
  }
}