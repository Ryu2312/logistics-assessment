import { Query, Resolver } from '@nestjs/graphql';
import { OperationsService } from './operations.service';
import { OperationModel } from './models/operation.model';

@Resolver(() => OperationModel)
export class OperationsResolver {
    constructor(private readonly operationsService: OperationsService) { }

    @Query(() => [OperationModel], { name: 'operations' })
    async findAll() {
        return this.operationsService.findAll();
    }
}