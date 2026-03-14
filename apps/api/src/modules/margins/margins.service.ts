
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { UpsertOperationMarginsInput } from './inputs/upsert-operation-margins.input';
import { v7 } from 'uuid';

@Injectable()
export class MarginsService {
    constructor(private readonly prisma: PrismaService) { }

    async getPlantOperations(plantId: string) {
        const [operations, rows] = await Promise.all([
            this.prisma.operation.findMany({
                orderBy: { id: 'asc' },
            }),
            this.prisma.operationMargin.findMany({
                where: { plantId },
                include: {
                    operation: true,
                },
                orderBy: [
                    { operation: { id: 'asc' } },
                    { volume: 'asc' },
                ],
            }),
        ]);

        const marginsByOperation = new Map<
            string,
            { volume: string; margin: number }[]
        >();

        for (const row of rows) {
            const existing = marginsByOperation.get(row.operationId) ?? [];

            existing.push({
                volume: row.volume,
                margin: row.margin,
            });

            marginsByOperation.set(row.operationId, existing);
        }

        return operations.map((operation) => ({
            operationId: operation.id,
            operationName: operation.name,
            margins: marginsByOperation.get(operation.id) ?? [],
        }));
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
                        id: v7(),
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