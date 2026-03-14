import { Test, TestingModule } from '@nestjs/testing';
import { OperationsService } from 'src/modules/operations/operations.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOperationInput } from 'src/modules/operations/inputs/create-operation.input';

describe('OperationsService', () => {
    let service: OperationsService;
    let prismaService: PrismaService;

    const mockPrismaService = {
        operation: {
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
                OperationsService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        service = module.get<OperationsService>(OperationsService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it('should return all operations', async () => {
            const mockOperations = [
                { id: '1', name: 'Carga' },
                { id: '2', name: 'Descarga' },
            ];

            mockPrismaService.operation.findMany.mockResolvedValue(mockOperations);

            const result = await service.findAll();

            expect(result).toEqual(mockOperations);
            expect(mockPrismaService.operation.findMany).toHaveBeenCalled();
        });
    });

    describe('create', () => {
        it('should create a new operation', async () => {
            const input: CreateOperationInput = { name: 'Transporte' };
            const mockOperation = { id: '3', name: 'Transporte' };

            mockPrismaService.operation.create.mockResolvedValue(mockOperation);

            const result = await service.create(input);

            expect(result).toEqual(mockOperation);
            expect(mockPrismaService.operation.create).toHaveBeenCalledWith({
                data: { id: '00000000-0000-7000-8000-000000000000', name: 'Transporte' },
            });
        });
    });

    describe('delete', () => {
        it('should delete an operation', async () => {
            mockPrismaService.operation.delete.mockResolvedValue({ id: '1', name: 'Carga' });

            await service.delete('1');

            expect(mockPrismaService.operation.delete).toHaveBeenCalledWith({
                where: { id: '1' },
            });
        });

        it('should throw error when operation not found', async () => {
            mockPrismaService.operation.delete.mockRejectedValue(
                new Error('Operation not found'),
            );

            await expect(service.delete('non-existent')).rejects.toThrow(
                'Operation not found',
            );
        });
    });
});
