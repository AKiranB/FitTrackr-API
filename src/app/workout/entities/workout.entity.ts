import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Status } from '../enums/status.enum';

@ObjectType()
@Schema()
export class Workout {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  date: string;

  @Field(() => String)
  time: string;

  @Field(() => Status)
  status: Status;

  @Field(() => Number)
  duration: number;

  @Field(() => String)
  createdBy: string;

  @Field(() => String)
  planID: string;
}

export type WorkoutDocument = Workout & Document;
export const WorkoutSchema = SchemaFactory.createForClass(Workout);
