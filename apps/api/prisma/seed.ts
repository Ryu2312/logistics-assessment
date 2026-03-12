import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, VolumeRange } from './generated/client/client';
import { randomInt } from 'crypto';

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env['DATABASE_URL'],
    }),
})

const volumes: VolumeRange[] = [
    VolumeRange.KG_300,
    VolumeRange.KG_500,
    VolumeRange.T_1,
    VolumeRange.T_3,
    VolumeRange.T_5,
    VolumeRange.T_10,
    VolumeRange.T_20,
    VolumeRange.T_30,
];

async function main() {
    const plantNames = ['Lima', 'Arequipa', 'Trujillo'];
    const operationNames = ['Transporte', 'Almacenaje', 'Distribución', 'Carga'];

    const plants = await Promise.all(
        plantNames.map((name) =>
            prisma.plant.upsert({
                where: { name },
                update: {},
                create: { name },
            }),
        ),
    );

    const operations = await Promise.all(
        operationNames.map((name) =>
            prisma.operation.upsert({
                where: { name },
                update: {},
                create: { name },
            }),
        ),
    );

    const marginQueries = plants.flatMap((plant) =>
        operations.flatMap((operation) =>
            volumes.map((volume) =>
                prisma.operationMargin.upsert({
                    where: {
                        plantId_operationId_volume: {
                            plantId: plant.id,
                            operationId: operation.id,
                            volume,
                        },
                    },
                    update: {
                        margin: randomInt(5, 31),
                    },
                    create: {
                        plantId: plant.id,
                        operationId: operation.id,
                        volume,
                        margin: randomInt(5, 31),
                    },
                }),
            ),
        ),
    );

    await prisma.$transaction(marginQueries);

    console.log('Seed completed successfully');
}

main()
    .catch((error) => {
        console.error('Seed failed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });