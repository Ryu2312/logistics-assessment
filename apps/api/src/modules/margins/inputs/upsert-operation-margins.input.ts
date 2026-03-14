import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsUUID, ValidateNested } from 'class-validator';
import { VolumeMarginInput } from './volume-margin.input';

@InputType()
export class UpsertOperationMarginsInput {
    @Field(() => ID)
    @IsUUID()
    plantId!: string;

    @Field(() => ID)
    @IsUUID()
    operationId!: string;

    @Field(() => [VolumeMarginInput])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VolumeMarginInput)
    margins!: VolumeMarginInput[];
}