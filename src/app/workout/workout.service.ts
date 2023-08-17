import { Injectable } from '@nestjs/common';
import { CreateWorkoutInput } from './dto/create-workout.input';
import { UpdateWorkoutInput } from './dto/update-workout.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from './entities/workout.entity';
import { Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectModel(Workout.name) private workoutModule: Model<WorkoutDocument>,
  ) {}
  create(createWorkoutInput: CreateWorkoutInput) {
    console.log('Received createWorkoutInput:', createWorkoutInput);

    try {
      const workout = this.workoutModule.create(createWorkoutInput);
      console.log(workout);
      return workout;
    } catch (error) {
      console.error('Error creating workout:', error);
      throw new Error('Failed to create workout');
    }
  }

  findAll() {
    return `This action returns all workout`;
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    const workout = this.workoutModule.findById(id);
    return workout;
  }

  update(
    id: MongooseSchema.Types.ObjectId,
    updateWorkoutInput: UpdateWorkoutInput,
  ) {
    return this.workoutModule.findByIdAndUpdate(id, updateWorkoutInput);
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.workoutModule.findByIdAndDelete(id);
  }
}
