import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Exercise {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  description?: string;

  @Field(() => String)
  @Prop()
  createdBy: string;
}

export type ExerciseDocument = Exercise & Document;
export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
