import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreatePlannedExercisesInput {
  @Field(() => String) // Use String instead of MongooseSchema.Types.ObjectId
  exerciseID: MongooseSchema.Types.ObjectId;

  @Field(() => Number)
  sets: number;

  @Field(() => Number)
  reps: number;
}
