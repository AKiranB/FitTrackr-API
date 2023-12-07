import { Field, InputType } from '@nestjs/graphql';
import { GenericFilterInput } from './filter-input';

@InputType()
export class WorkoutFilterInput extends GenericFilterInput {
  @Field(() => String)
  month?: string;
}
