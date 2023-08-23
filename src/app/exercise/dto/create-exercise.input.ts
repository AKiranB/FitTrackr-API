import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExerciseInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  createdBy: string;
}
