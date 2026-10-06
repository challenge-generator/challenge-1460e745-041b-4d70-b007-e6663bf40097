import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;

  constructor(private readonly configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('DATABASE_URL'),
        },
      },
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'info' },
      ],
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.isConnected = true;
      this.logger.log('Prisma Client connected to database successfully');
      
      this.$on('error', (event: any) => {
        this.logger.error(`Prisma Client error event: ${event.message}`, event.stack);
      });
      
      this.$on('warn', (event: any) => {
        this.logger.warn(`Prisma Client warning: ${event.message}`);
      });
    } catch (error) {
      this.logger.error('Failed to connect Prisma Client to database', error.stack);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      this.isConnected = false;
      this.logger.log('Prisma Client disconnected from database successfully');
    } catch (error) {
      this.logger.error('Error disconnecting Prisma Client', error.stack);
    }
  }

  async enableShutdownHooks(): Promise<void> {
    process.on('beforeExit', async () => {
      await this.$disconnect();
      this.logger.log('Prisma Client shutdown hooks executed');
    });
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  async executeTransaction<T>(
    callback: (tx: PrismaClient) => Promise<T>
  ): Promise<T> {
    return this.$transaction(callback);
  }

  async executeInTransaction<T>(
    operations: Array<() => Promise<T>>
  ): Promise<T[]> {
    return this.$transaction(async (tx) => {
      const results: T[] = [];
      for (const operation of operations) {
        results.push(await operation());
      }
      return results;
    });
  }
}