import { TestingModule, Test } from '@nestjs/testing';
import { UserResolver } from '../user/user.resolver';
import { UserService } from '../user/user.service';
import * as Chance from 'chance';
import { Schema as MongooSchema } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

const userId = new MongooSchema.Types.ObjectId('');
const chance = new Chance();

const createUserInput: CreateUserInput = {
  name: chance.name(),
  password: 'FakePassword1?',
  email: chance.email(),
};

const updateUserInput: UpdateUserInput = {
  _id: userId,
  name: chance.name(),
};

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useFactory: () => ({
            create: jest.fn(() => {
              return {
                _id: userId,
                ...createUserInput,
              };
            }),
            findAll: jest.fn(() => {
              return [
                {
                  _id: userId,
                  ...createUserInput,
                },
              ];
            }),
            findOneById: jest.fn(() => {
              return {
                _id: userId,
                ...createUserInput,
              };
            }),
            update: jest.fn(() => {
              return {
                _id: userId,
                ...createUserInput,
                ...updateUserInput,
              };
            }),
            remove: jest.fn(() => {
              return {};
            }),
          }),
        },
      ],
    }).compile();
    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await resolver.createUser({
      ...createUserInput,
    });
    expect(user).toBeDefined();
    expect(user.email).toEqual(createUserInput.email);
    expect(user.name).toEqual(createUserInput.name);
    expect(user.password).not.toBeNull();
    expect(user._id).not.toBeNull();
  });

  it('should find all users', async () => {
    const users = await resolver.findAll({ limit: 10, skip: 0 });
    expect(users).toBeDefined();
    expect(users[0].email).toEqual(createUserInput.email);
    expect(users[0].name).toEqual(createUserInput.name);
    expect(users[0].password).not.toBeNull();
    expect(users[0]._id).not.toBeNull();
  });

  it('should find a user by id', async () => {
    const user = await resolver.findOne(userId);
    expect(user).toBeDefined();
    expect(user.email).toEqual(createUserInput.email);
    expect(user.name).toEqual(createUserInput.name);
    expect(user.password).not.toBeNull();
    expect(user._id).not.toBeNull();
  });

  it('should update a user', async () => {
    const user = await resolver.updateUser(updateUserInput);
    expect(user).toBeDefined();
    expect(user.email).toEqual(createUserInput.email);
    expect(user.name).toEqual(updateUserInput.name);
    expect(user.password).not.toBeNull();
    expect(user._id).not.toBeNull();
  });

  it('should delete a user', async () => {
    const user = await resolver.removeUser(userId);
    expect(user).toBeDefined();
  });
});
