import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';

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

  //TODO: add a field for the user that created the plan
  //TODO: a plan should have an array of exercsies that are part of the plan --> relational
}
export type PlanDocument = Plan & Document;
export const PlanSchema = SchemaFactory.createForClass(Plan);
