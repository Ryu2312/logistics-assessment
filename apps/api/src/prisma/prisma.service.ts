import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'prisma/generated/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    constructor(config: ConfigService) {
        super({
            adapter: new PrismaPg({
                connectionString: config.getOrThrow<string>('DATABASE_URL'),
                max: Number(config.get<string>('DB_POOL_MAX') ?? 10),
                connectionTimeoutMillis: Number(
                    config.get<string>('DB_POOL_TIMEOUT_MS') ?? 5000,
                ),
                idleTimeoutMillis: Number(
                    config.get<string>('DB_IDLE_TIMEOUT_MS') ?? 10000,
                ),
            }),
            log: ['warn', 'error'],
        });
    }

    async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }
}