import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  create(createUserInput: CreateUserInput) {
    const user = this.userModel.create(createUserInput);
    return user;
  }

  findAll() {
    return `This action returns all user`;
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
