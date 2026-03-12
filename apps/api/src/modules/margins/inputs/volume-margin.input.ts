import { Field, Float, InputType } from '@nestjs/graphql';
import { VolumeRange } from 'prisma/generated/client';

@InputType()
export class VolumeMarginInput {
    @Field(() => VolumeRange)
    volume!: VolumeRange;

    @Field(() => Float)
    margin!: number;
}