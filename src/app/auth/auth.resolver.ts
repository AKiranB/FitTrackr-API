import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './gaurds/gql-auth.gards';
import { CreateUserInput } from '../user/dto/create-user.input';
import { User } from '../user/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context: any,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  async signup(@Args('sigUpUserInput') createUserInput: CreateUserInput) {
    return this.authService.signup(createUserInput);
  }
}
