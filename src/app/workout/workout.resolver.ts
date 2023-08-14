import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkoutService } from './workout.service';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutInput } from './dto/create-workout.input';
import { UpdateWorkoutInput } from './dto/update-workout.input';

@Resolver(() => Workout)
export class WorkoutResolver {
  constructor(private readonly workoutService: WorkoutService) {}

  @Mutation(() => Workout)
  createWorkout(@Args('createWorkoutInput') createWorkoutInput: CreateWorkoutInput) {
    return this.workoutService.create(createWorkoutInput);
  }

  @Query(() => [Workout], { name: 'workout' })
  findAll() {
    return this.workoutService.findAll();
  }

  @Query(() => Workout, { name: 'workout' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.workoutService.findOne(id);
  }

  @Mutation(() => Workout)
  updateWorkout(@Args('updateWorkoutInput') updateWorkoutInput: UpdateWorkoutInput) {
    return this.workoutService.update(updateWorkoutInput.id, updateWorkoutInput);
  }

  @Mutation(() => Workout)
  removeWorkout(@Args('id', { type: () => Int }) id: number) {
    return this.workoutService.remove(id);
  }
}
