import { Test, TestingModule } from '@nestjs/testing';
import { PlantsService } from 'src/modules/plants/plants.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('PlantsService', () => {
    let service: PlantsService;
    let prismaService: PrismaService;

    const mockPrismaService = {
        plant: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlantsService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        service = module.get<PlantsService>(PlantsService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it('should return an array of plants', async () => {
            const mockPlants = [
                { id: '1', name: 'Perú' },
                { id: '2', name: 'México' },
            ];

            mockPrismaService.plant.findMany.mockResolvedValue(mockPlants);

            const result = await service.findAll();

            expect(result).toEqual(mockPlants);
            expect(mockPrismaService.plant.findMany).toHaveBeenCalledWith({
                orderBy: { name: 'asc' },
            });
        });

        it('should return an empty array when no plants exist', async () => {
            mockPrismaService.plant.findMany.mockResolvedValue([]);

            const result = await service.findAll();

            expect(result).toEqual([]);
        });
    });
});
