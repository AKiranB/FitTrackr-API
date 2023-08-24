import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlannedExercisesInput {
  @Field(() => String)
  exerciseID: string;

  @Field(() => Number)
  sets: number;

  @Field(() => Number)
  reps: number;
}
