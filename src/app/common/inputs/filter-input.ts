import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GenericFilterInput {
  @Field(() => String)
  createdBy: string;
}
