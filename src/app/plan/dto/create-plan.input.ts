import { InputType, Field } from '@nestjs/graphql';
import { PlannedExercises } from '../entities/plan.entity';
import { CreatePlannedExercisesInput } from './create-plannedExercises.input';

@InputType()
export class CreatePlanInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  createdBy: string;

  @Field(() => [CreatePlannedExercisesInput])
  exercises: PlannedExercises[];
}
