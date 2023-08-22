import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePlanInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
