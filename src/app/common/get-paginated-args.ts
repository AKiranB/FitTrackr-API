import { Field, ArgsType, Int } from '@nestJs/graphql';

@ArgsType()
export class GetPaginatedArgs {
  @Field(() => Int, { defaultValue: 10, nullable: true })
  limit?: number;

  @Field(() => Int, { defaultValue: 0, nullable: true })
  skip?: number;
}
