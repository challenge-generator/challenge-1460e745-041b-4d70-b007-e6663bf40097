import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import * as Joi from 'joi';
import { PrismaService } from '../database/prisma.service';

interface AppConfig {
  database: {
    url: string;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
  app: {
    host: string;
    port: number;
    env: string;
    apiTitle: string;
    apiVersion: string;
  };
  logging: {
    level: string;
    format: string;
  };
  services: {
    antifraud: {
      timeout: number;
      retryAttempts: number;
    };
    riskBureau: {
      timeout: number;
      retryAttempts: number;
    };
    creditOriginator: {
      timeout: number;
      retryAttempts: number;
    };
  };
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().default('postgres'),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().default('loan_db'),
        APP_HOST: Joi.string().default('0.0.0.0'),
        APP_PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        API_TITLE: Joi.string().default('Loan Microservice API'),
        API_VERSION: Joi.string().default('1.0'),
        LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
        LOG_FORMAT: Joi.string().valid('json', 'text').default('json'),
        ANTIFRAUD_TIMEOUT: Joi.number().default(2000),
        ANTIFRAUD_RETRY_ATTEMPTS: Joi.number().default(3),
        RISK_BUREAU_TIMEOUT: Joi.number().default(2000),
        RISK_BUREAU_RETRY_ATTEMPTS: Joi.number().default(3),
        CREDIT_ORIGINATOR_TIMEOUT: Joi.number().default(2000),
        CREDIT_ORIGINATOR_RETRY_ATTEMPTS: Joi.number().default(3),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
  ],
  providers: [
    {
      provide: 'APP_CONFIG',
      useFactory: (configService: ConfigService): AppConfig => {
        return {
          database: {
            url: configService.get<string>('DATABASE_URL')!,
            host: configService.get<string>('DB_HOST')!,
            port: configService.get<number>('DB_PORT')!,
            username: configService.get<string>('DB_USERNAME')!,
            password: configService.get<string>('DB_PASSWORD')!,
            name: configService.get<string>('DB_NAME')!,
          },
          app: {
            host: configService.get<string>('APP_HOST')!,
            port: configService.get<number>('APP_PORT')!,
            env: configService.get<string>('NODE_ENV')!,
            apiTitle: configService.get<string>('API_TITLE')!,
            apiVersion: configService.get<string>('API_VERSION')!,
          },
          logging: {
            level: configService.get<string>('LOG_LEVEL')!,
            format: configService.get<string>('LOG_FORMAT')!,
          },
          services: {
            antifraud: {
              timeout: configService.get<number>('ANTIFRAUD_TIMEOUT')!,
              retryAttempts: configService.get<number>('ANTIFRAUD_RETRY_ATTEMPTS')!,
            },
            riskBureau: {
              timeout: configService.get<number>('RISK_BUREAU_TIMEOUT')!,
              retryAttempts: configService.get<number>('RISK_BUREAU_RETRY_ATTEMPTS')!,
            },
            creditOriginator: {
              timeout: configService.get<number>('CREDIT_ORIGINATOR_TIMEOUT')!,
              retryAttempts: configService.get<number>('CREDIT_ORIGINATOR_RETRY_ATTEMPTS')!,
            },
          },
        };
      },
      inject: [ConfigService],
    },
    PrismaService,
  ],
  exports: ['APP_CONFIG', PrismaService],
})
export class AppConfigModule {}

export { AppConfig };