import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoanRequestService } from './application/loan-request.service';
import { LoanRequestRepository } from './domain/ports/loan-request.repository';
import { PrismaLoanRequestRepository } from './infrastructure/repositories/prisma-loan-request.repository';
import { PrismaService } from './infrastructure/database/prisma.service';
import { AppConfig } from './infrastructure/config/app.config';
import { WinstonLogger } from './infrastructure/logging/winston.logger';
import { HttpExceptionFilter } from './infrastructure/filters/http-exception.filter';
import { LoggingInterceptor } from './infrastructure/interceptors/logging.interceptor';
import { TransformInterceptor } from './infrastructure/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
      validationSchema: null,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: LoanRequestService,
      inject: [LoanRequestRepository, WinstonLogger],
      useFactory: (repository: LoanRequestRepository, logger: WinstonLogger) => {
        return new LoanRequestService(repository, logger);
      },
    },
    {
      provide: LoanRequestRepository,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => {
        return new PrismaLoanRequestRepository(prisma);
      },
    },
    PrismaService,
    WinstonLogger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  exports: [LoanRequestService, LoanRequestRepository],
})
export class AppModule {}