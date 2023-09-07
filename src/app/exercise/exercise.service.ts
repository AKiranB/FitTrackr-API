import { Injectable } from '@nestjs/common';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise, ExerciseDocument } from './entities/exercise.entity';
import { Model } from 'mongoose';
import { GenericFilterInput } from '../common/inputs/filter-input';
import { Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
  ) {}
  create(createExerciseInput: CreateExerciseInput) {
    const exercise = new this.exerciseModel(createExerciseInput);
    return exercise.save();
  }

  findAll(filter?: GenericFilterInput) {
    if (filter) {
      const exercises = this.exerciseModel
        .find({ createdBy: filter.createdBy })
        .exec();
      return exercises;
    }
    const workouts = this.exerciseModel.find();
    return workouts;
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.exerciseModel.findByIdAndDelete(id);
  }
}
