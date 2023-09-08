import { Injectable } from '@nestjs/common';
import { CreateWorkoutInput } from './dto/create-workout.input';
import { UpdateWorkoutInput } from './dto/update-workout.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from './entities/workout.entity';
import { Schema as MongooseSchema } from 'mongoose';
import { GenericFilterInput } from '../common/inputs/filter-input';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
  ) {}
  create(createWorkoutInput: CreateWorkoutInput) {
    try {
      const workout = this.workoutModel.create(createWorkoutInput);
      return workout;
    } catch (error) {
      throw new Error('Failed to create workout');
    }
  }

  findAll(filter?: GenericFilterInput) {
    if (filter) {
      const workouts = this.workoutModel
        .find({ createdBy: filter.createdBy })
        .exec();
      return workouts;
    }
    const workouts = this.workoutModel.find();
    return workouts;
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    const workout = this.workoutModel.findById(id);
    return workout;
  }

  update(
    id: MongooseSchema.Types.ObjectId,
    updateWorkoutInput: UpdateWorkoutInput,
  ) {
    return this.workoutModel.findByIdAndUpdate(id, updateWorkoutInput, {
      new: true,
    });
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.workoutModel.findByIdAndDelete(id);
  }
}
