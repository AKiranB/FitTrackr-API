import { Injectable } from '@nestjs/common';
import { CreateWorkoutInput } from './dto/create-workout.input';
import { UpdateWorkoutInput } from './dto/update-workout.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from './entities/workout.entity';
import { Schema as MongooseSchema } from 'mongoose';
import { WorkoutFilterInput } from '../common/inputs/workout-filter-input';

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

  findAll(filter?: WorkoutFilterInput) {
    interface Query {
      createdBy?: string;
      date?: { $regex: string };
    }
    const query: Query = {};

    if (filter) {
      if (filter.createdBy) {
        query.createdBy = filter.createdBy;
      }
      if (filter.month) {
        query.date = {
          $regex: `-${filter.month.padStart(2, '0')}-`,
        };
      }
    }
    return this.workoutModel.find(query).exec();
  }
  findOneBy({
    createdBy,
    date,
    time,
  }: {
    createdBy: string;
    date: string;
    time: string;
  }) {
    const workout = this.workoutModel.findOne({ createdBy, date, time });
    return workout;
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
