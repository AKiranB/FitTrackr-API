import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { ExerciseInfo } from '../../common/types';

@ObjectType()
@Schema()
export class PlannedExercises {
  @Field(() => String)
  @Prop({ type: Types.ObjectId, ref: 'Exercise' })
  exerciseID: string;

  @Field(() => Number)
  sets: number;

  @Field(() => Number)
  reps: number;
}

@ObjectType()
@Schema()
export class Plan {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  description?: string;

  @Field(() => User)
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Field(() => [PlannedExercises])
  @Prop()
  exercises: ExerciseInfo[];

  //TODO: add a field for the user that created the plan
  //TODO: a plan should have an array of exercsies that are part of the plan --> relational
}
export type PlanDocument = Plan & Document;
export const PlanSchema = SchemaFactory.createForClass(Plan);
