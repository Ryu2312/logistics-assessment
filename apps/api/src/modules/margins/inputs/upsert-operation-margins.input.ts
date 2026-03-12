import { Field, ID, InputType } from '@nestjs/graphql';
import { VolumeMarginInput } from './volume-margin.input';

@InputType()
export class UpsertOperationMarginsInput {
    @Field(() => ID)
    plantId!: string;

    @Field(() => ID)
    operationId!: string;

    @Field(() => [VolumeMarginInput])
    margins!: VolumeMarginInput[];
}