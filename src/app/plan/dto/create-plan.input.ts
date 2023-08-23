import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlanInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
