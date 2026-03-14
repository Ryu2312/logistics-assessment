import { Test, TestingModule } from '@nestjs/testing';
import { MarginsService } from 'src/modules/margins/margins.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpsertOperationMarginsInput } from 'src/modules/margins/inputs/upsert-operation-margins.input';

describe('MarginsService', () => {
    let service: MarginsService;
    let prismaService: PrismaService;

    const mockPrismaService = {
        operationMargin: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            upsert: jest.fn(),
            deleteMany: jest.fn(),
        },
        operation: {
            findMany: jest.fn(),
        },
        $transaction: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MarginsService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        service = module.get<MarginsService>(MarginsService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getPlantOperations', () => {
        it('should return margins for an operation', async () => {
            const mockOperations = [{ id: '1', name: 'Test Op' }];
            const mockMargins = [
                { id: '1', operationId: '1', volume: 'KG_300', margin: 15.5 },
                { id: '2', operationId: '1', volume: 'T_1', margin: 12.0 },
            ];

            mockPrismaService.operation.findMany.mockResolvedValue(mockOperations);
            mockPrismaService.operationMargin.findMany.mockResolvedValue(mockMargins);

            const result = await service.getPlantOperations('1');

            expect(result).toEqual([{
                operationId: '1',
                operationName: 'Test Op',
                margins: [
                    { volume: 'KG_300', margin: 15.5 },
                    { volume: 'T_1', margin: 12.0 },
                ]
            }]);
            expect(mockPrismaService.operationMargin.findMany).toHaveBeenCalledWith({
                where: { plantId: '1' },
                include: { operation: true },
                orderBy: [
                    { operation: { id: 'asc' } },
                    { volume: 'asc' },
                ],
            });
        });
    });

    describe('upsertMargins', () => {
        it('should upsert operation margins', async () => {
            const input: UpsertOperationMarginsInput = {
                operationId: '1',
                plantId: 'plant-1',
                margins: [
                    { volume: 'KG_300', margin: 15.5 },
                    { volume: 'T_1', margin: 12.0 },
                ],
            };

            const mockOperations = [{ id: '1', name: 'Test Op' }];
            mockPrismaService.operation.findMany.mockResolvedValue(mockOperations);
            mockPrismaService.operationMargin.findMany.mockResolvedValue([]);
            mockPrismaService.$transaction.mockResolvedValue([]);

            const result = await service.upsertOperationMargins(input);

            expect(result).toBeDefined();
            expect(mockPrismaService.$transaction).toHaveBeenCalled();
        });

        it('should validate margin range', async () => {
            const input: UpsertOperationMarginsInput = {
                operationId: '1',
                plantId: 'plant-1',
                margins: [{ volume: 'KG_300', margin: 1 }], // Invalid: less than 5
            };

            await expect(service.upsertOperationMargins(input)).rejects.toThrow(
                'Margin for volume KG_300 cannot be lower than 5%'
            );
        });
    });
});
