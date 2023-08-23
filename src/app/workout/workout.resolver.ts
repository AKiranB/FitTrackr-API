import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WorkoutService } from './workout.service';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutInput } from './dto/create-workout.input';
import { UpdateWorkoutInput } from './dto/update-workout.input';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => Workout)
export class WorkoutResolver {
  constructor(private readonly workoutService: WorkoutService) {}

  @Mutation(() => Workout)
  createWorkout(
    @Args('createWorkoutInput') createWorkoutInput: CreateWorkoutInput,
  ) {
    return this.workoutService.create(createWorkoutInput);
  }

  @Mutation(() => Workout)
  updateWorkout(
    @Args('updateWorkoutInput') updateWorkoutInput: UpdateWorkoutInput,
  ) {
    return this.workoutService.update(
      updateWorkoutInput._id,
      updateWorkoutInput,
    );
  }

  @Mutation(() => Workout)
  removeWorkout(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.workoutService.remove(id);
  }

  @Query(() => [Workout], { name: 'findAllWorkouts' })
  findAll() {
    return this.workoutService.findAll();
  }

  @Query(() => Workout, { name: 'findWorkoutById' })
  async findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    const workout = await this.workoutService
      .findOne(id)
      .populate({ path: 'createdBy' })
      .exec();

    return workout;
  }
}
