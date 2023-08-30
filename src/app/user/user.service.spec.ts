import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../common/helpers/mongoose.helper';
import { User, UserSchema } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import * as Chance from 'chance';

const chance = new Chance();

const createUserInput: CreateUserInput = {
  email: chance.email(),
  password: 'test123',
  name: chance.name(),
};

const updateUserInput = {
  email: chance.email(),
  name: chance.name(),
};

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [UserService],
      imports: [
        rootMongooseTestModule(),
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeInMongodConnection();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.create(createUserInput);
    expect(user).toBeDefined();
    expect(user.email).toEqual(createUserInput.email);
    expect(user.name).toEqual(createUserInput.name);
    expect(user.password).not.toBeNull();
  });

  it('should find a user by id', async () => {
    const user = await service.create(createUserInput);
    const foundUser = await service.findOneById(user._id);
    expect(foundUser).not.toBeNull();
  });

  it('should find a user by email', async () => {
    const user = await service.create(createUserInput);
    const foundUser = await service.findOneByEmail(user.email);
    expect(foundUser).not.toBeNull();
    expect(foundUser.email).toEqual(user.email);
    expect(foundUser.name).toEqual(user.name);
  });

  it('should update a user', async () => {
    const user = await service.create(createUserInput);
    const updatedUser = await service.update(user._id, updateUserInput);
    expect(updatedUser).not.toBeNull();
    expect(updatedUser.email).toEqual(user.email);
    expect(updatedUser.name).toEqual(user.name);
  });

  it('should delete a user', async () => {
    const user = await service.create(createUserInput);
    await service.remove(user._id);
    const foundUser = await service.findOneById(user._id);
    expect(foundUser).toBeNull();
  });

  it('should find all users', async () => {
    await service.create({ ...createUserInput, email: chance.email() });
    await service.create({ ...createUserInput, email: chance.email() });
    const users = await service.findAll();
    expect(users.length).toEqual(2);
  });
});
