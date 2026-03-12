import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OperationModel {
    @Field(() => ID)
    id!: string;

    @Field()
    name!: string;
}