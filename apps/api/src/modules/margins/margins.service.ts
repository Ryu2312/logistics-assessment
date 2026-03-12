import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { UpsertOperationMarginsInput } from './inputs/upsert-operation-margins.input';

@Injectable()
export class MarginsService {
    constructor(private readonly prisma: PrismaService) { }

    async getPlantOperations(plantId: string) {
        const rows = await this.prisma.operationMargin.findMany({
            where: { plantId },
            include: {
                operation: true,
            },
            orderBy: [
                { operation: { name: 'asc' } },
                { volume: 'asc' },
            ],
        });

        const grouped = new Map<
            string,
            {
                operationId: string;
                operationName: string;
                margins: { volume: any; margin: number; alert: boolean }[];
            }
        >();

        for (const row of rows) {
            const existing = grouped.get(row.operationId);

            const marginItem = {
                volume: row.volume,
                margin: row.margin,
                alert: row.margin <= 5,
            };

            if (!existing) {
                grouped.set(row.operationId, {
                    operationId: row.operationId,
                    operationName: row.operation.name,
                    margins: [marginItem],
                });
                continue;
            }

            existing.margins.push(marginItem);
        }

        return Array.from(grouped.values());
    }

    async upsertOperationMargins(input: UpsertOperationMarginsInput) {
        const { plantId, operationId, margins } = input;

        await this.prisma.$transaction(
            margins.map((item) =>
                this.prisma.operationMargin.upsert({
                    where: {
                        plantId_operationId_volume: {
                            plantId,
                            operationId,
                            volume: item.volume,
                        },
                    },
                    create: {
                        plantId,
                        operationId,
                        volume: item.volume,
                        margin: item.margin,
                    },
                    update: {
                        margin: item.margin,
                    },
                }),
            ),
        );

        return this.getPlantOperations(plantId);
    }
}