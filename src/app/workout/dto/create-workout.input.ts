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

  @Field(() => Status, { defaultValue: Status.PLANNED })
  status: Status;

  @Field(() => String)
  createdBy: string;

  @Field(() => String)
  plan: string;
}
