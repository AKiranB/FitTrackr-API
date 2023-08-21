import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ExerciseRepInput {
  @Field(() => String)
  exerciseId: string;

  @Field(() => Int)
  repetitions: number;
}

@InputType()
export class CreatePlanInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => [ExerciseRepInput])
  exercises: ExerciseRepInput[];
}
