
import { BadRequestException, Injectable } from '@nestjs/common';
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
                margins: { volume: string; margin: number }[];
            }
        >();

        for (const row of rows) {
            const marginItem = {
                volume: row.volume,
                margin: row.margin,
            };

            const existing = grouped.get(row.operationId);

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
        this.validateMargins(input);

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

    private validateMargins(input: UpsertOperationMarginsInput) {
        for (const item of input.margins) {
            if (item.margin < 5) {
                throw new BadRequestException(
                    `Margin for volume ${item.volume} cannot be lower than 5%`,
                );
            }
        }
    }
}