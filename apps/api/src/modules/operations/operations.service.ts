import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { v7 } from 'uuid';

@Injectable()
export class OperationsService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.operation.findMany({
            orderBy: {
                name: 'asc',
            },
        });
    }

    async create(input: { name: string }) {
        return this.prisma.operation.create({
            data: {
                id: v7(),
                name: input.name,
            },
        });
    }


    async delete(id: string) {
        return await this.prisma.operation.delete({
            where: {
                id,
            },
        });

    }
}