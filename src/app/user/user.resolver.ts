import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Schema as MongooseSchema } from 'mongoose';
import { GetPaginatedArgs } from '../common/get-paginated-args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.remove(id);
  }
  @Query(() => [User], { name: 'findAllUsers' })
  findAll(@Args() args?: GetPaginatedArgs) {
    return this.userService.findAll(args.limit, args.skip);
  }

  @Query(() => User, { name: 'findUserById' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.findOneById(id);
  }

  @Query(() => User, { name: 'findUserByEmail' })
  findOneByEmail(@Args('email') email: string) {
    return this.userService.findOneByEmail(email);
  }
}
