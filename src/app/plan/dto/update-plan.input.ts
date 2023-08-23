import { CreatePlanInput } from './create-plan.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdatePlanInput extends PartialType(CreatePlanInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}
