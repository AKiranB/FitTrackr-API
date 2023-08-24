import { Injectable } from '@nestjs/common';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise, ExerciseDocument } from './entities/exercise.entity';
import { Model } from 'mongoose';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
  ) {}
  create(createExerciseInput: CreateExerciseInput) {
    const exercise = new this.exerciseModel(createExerciseInput);
    return exercise.save();
  }

  findAll() {
    return `This action returns all exercise`;
  }

  remove(id: number) {
    return this.exerciseModel.findByIdAndDelete(id);
  }
}
