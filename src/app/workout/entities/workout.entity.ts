import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { Status } from '../enums/status.enum';
import { User } from '../../user/entities/user.entity';
import { Plan } from '../../plan/entities/plan.entity';

@ObjectType()
@Schema()
export class Workout {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({
    nullable: false,
    match: /^(\d{4})-(\d{2})-(\d{2})$/,
  })
  date: string;

  @Field(() => String)
  @Prop({
    nullable: false,
    match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  })
  time: string;

  @Field(() => Status)
  @Prop()
  status: Status;

  @Field(() => Number)
  @Prop()
  duration: number;

  @Field(() => User)
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Field(() => Plan)
  @Prop({ type: Types.ObjectId, ref: 'Plan' })
  plan: Plan;
}

export type WorkoutDocument = Workout & Document;
export const WorkoutSchema = SchemaFactory.createForClass(Workout);
