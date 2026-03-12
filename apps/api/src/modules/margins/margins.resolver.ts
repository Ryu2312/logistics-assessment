import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MarginsService } from './margins.service';
import { UpsertOperationMarginsInput } from './inputs/upsert-operation-margins.input';
import { OperationMarginModel } from './models/operation-margin.model';

@Resolver(() => OperationMarginModel)
export class MarginsResolver {
    constructor(private readonly marginsService: MarginsService) { }

    @Query(() => [OperationMarginModel], { name: 'plantOperations' })
    async getPlantOperations(
        @Args('plantId', { type: () => String }) plantId: string,
    ) {
        return this.marginsService.getPlantOperations(plantId);
    }

    @Mutation(() => [OperationMarginModel], { name: 'upsertOperationMargins' })
    async upsertOperationMargins(
        @Args('input') input: UpsertOperationMarginsInput,
    ) {
        return this.marginsService.upsertOperationMargins(input);
    }
}