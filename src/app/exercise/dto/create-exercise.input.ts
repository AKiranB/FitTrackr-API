import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExerciseInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
