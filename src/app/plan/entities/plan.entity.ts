import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { ExerciseRep } from '../subdocuments/exerciseRep';
import { ExerciseRepInput } from '../dto/create-plan.input';

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

  @Field(() => ExerciseRepInput)
  @Prop()
  exercises: ExerciseRep[];
}
export type PlanDocument = Plan & Document;
export const PlanSchema = SchemaFactory.createForClass(Plan);
