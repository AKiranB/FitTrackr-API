import { InputType, Field } from '@nestjs/graphql';
import { Status } from '../enums/status.enum';

@InputType()
export class CreateWorkoutInput {
  @Field(() => String)
  date: string;

  @Field(() => String)
  time: string;

  @Field(() => Number)
  duration: number;

  @Field(() => Status)
  status: Status;

  @Field(() => String)
  CreatedBy: string;

  @Field(() => String)
  planID: string;
}
