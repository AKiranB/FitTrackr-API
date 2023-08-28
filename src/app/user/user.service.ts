import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const hash = await bcrypt.hash(
      createUserInput.password,
      this.configService.get<string>('SALT_ROUNDS'),
    );
    const createdUser = new this.userModel({
      ...createUserInput,
      password: hash,
    });

    return createdUser.save();
  }

  async login(loginInput: LoginUserInput) {
    const { email, password } = loginInput;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    } else {
      throw new Error('Invalid password');
    }
  }

  async findAll(limit: number, skip: number) {
    const users = await this.userModel.find().skip(skip).limit(limit);
    return users;
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    const user = this.userModel.findById(id);
    return user;
  }

  update(id: MongooseSchema.Types.ObjectId, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput);
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.userModel.findByIdAndDelete(id);
  }
}
