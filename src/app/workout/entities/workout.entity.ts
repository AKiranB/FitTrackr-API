import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { Status } from '../enums/status.enum';
import { User } from '../../user/entities/user.entity';

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
  status: Status;

  @Field(() => Number)
  duration: number;
  //TODO- Check relations and querie/mutations
  @Field(() => String)
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Field(() => String)
  @Prop({ nullable: true })
  planID: string;
}

export type WorkoutDocument = Workout & Document;
export const WorkoutSchema = SchemaFactory.createForClass(Workout);
