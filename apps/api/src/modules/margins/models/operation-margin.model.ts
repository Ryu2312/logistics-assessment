import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VolumeMarginModel } from './volume-margin.model';

@ObjectType()
export class OperationMarginModel {
    @Field(() => ID)
    operationId!: string;

    @Field()
    operationName!: string;

    @Field(() => [VolumeMarginModel])
    margins!: VolumeMarginModel[];
}