import { CreateExerciseInput } from './create-exercise.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
@InputType()
export class UpdateExerciseInput extends PartialType(CreateExerciseInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}
