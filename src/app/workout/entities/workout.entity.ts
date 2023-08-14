import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Workout {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
