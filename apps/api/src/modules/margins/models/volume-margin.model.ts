import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { VolumeRange } from 'prisma/generated/client/client';

registerEnumType(VolumeRange, {
    name: 'VolumeRange',
});

@ObjectType()
export class VolumeMarginModel {
    @Field(() => VolumeRange)
    volume!: VolumeRange;

    @Field(() => Float)
    margin!: number;
}