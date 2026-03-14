import { Field, Float, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber } from 'class-validator';
import { VolumeRange } from 'prisma/generated/client/enums';

@InputType()
export class VolumeMarginInput {
    @Field(() => VolumeRange)
    @IsEnum(VolumeRange)
    volume!: VolumeRange;

    @Field(() => Float)
    @IsNumber()
    margin!: number;
}