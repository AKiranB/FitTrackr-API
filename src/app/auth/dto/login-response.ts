import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  authToken: string;

  @Field(() => User)
  user: User;
}
