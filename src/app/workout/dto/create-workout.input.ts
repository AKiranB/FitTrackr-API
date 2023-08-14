import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateWorkoutInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
