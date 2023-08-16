import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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

  @Query(() => [Workout], { name: 'findAllWorkouts' })
  findAll() {
    return this.workoutService.findAll();
  }

  @Query(() => Workout, { name: 'findWorkoutById' })
  findOne(@Args('id', { type: () => Int }) id: MongooseSchema.Types.ObjectId) {
    return this.workoutService.findOne(id);
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
    @Args('id', { type: () => Int }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.workoutService.remove(id);
  }
}
