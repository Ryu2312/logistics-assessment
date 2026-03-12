import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PlantModel {
    @Field(() => ID)
    id!: string;

    @Field()
    name!: string;
}