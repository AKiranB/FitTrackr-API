import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class SignupResponse {
  @Field(() => User)
  user: User;
}
