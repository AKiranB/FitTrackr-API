import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateWorkoutInput } from './create-workout.input';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateWorkoutInput extends PartialType(CreateWorkoutInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}
