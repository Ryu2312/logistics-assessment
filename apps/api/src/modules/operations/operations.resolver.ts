import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OperationsService } from './operations.service';
import { OperationModel } from './models/operation.model';
import { CreateOperationInput } from './inputs/create-operation.input';
import { DeleteOperationInput } from './inputs/delete-operation.input';
import { OperationMarginModel } from '../margins/models/operation-margin.model';

@Resolver(() => OperationModel)
export class OperationsResolver {
    constructor(private readonly operationsService: OperationsService) { }

    @Query(() => [OperationModel], { name: 'operations' })
    async findAll() {
        return this.operationsService.findAll();
    }

    @Mutation(() => OperationMarginModel, { name: 'createOperation' })
    async create(@Args('input') input: CreateOperationInput) {
        const operation = await this.operationsService.create(input);

        return {
            operationId: operation.id,
            operationName: operation.name,
            margins: [],
        };
    }

    @Mutation(() => Boolean)
    async deleteOperation(
        @Args('input') input: DeleteOperationInput,
    ) {
        await this.operationsService.delete(input.id);
        return true;
    }
}