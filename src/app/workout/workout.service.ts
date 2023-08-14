import { Injectable } from '@nestjs/common';
import { CreateWorkoutInput } from './dto/create-workout.input';
import { UpdateWorkoutInput } from './dto/update-workout.input';

@Injectable()
export class WorkoutService {
  create(createWorkoutInput: CreateWorkoutInput) {
    return 'This action adds a new workout';
  }

  findAll() {
    return `This action returns all workout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workout`;
  }

  update(id: number, updateWorkoutInput: UpdateWorkoutInput) {
    return `This action updates a #${id} workout`;
  }

  remove(id: number) {
    return `This action removes a #${id} workout`;
  }
}
