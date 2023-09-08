import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WorkoutService } from './workout.service';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutInput } from './dto/create-workout.input';
import { UpdateWorkoutInput } from './dto/update-workout.input';
import { Schema as MongooseSchema } from 'mongoose';
import { GenericFilterInput } from '../common/inputs/filter-input';

@Resolver(() => Workout)
export class WorkoutResolver {
  constructor(private readonly workoutService: WorkoutService) {}

  @Mutation(() => Workout)
  async createWorkout(
    @Args('createWorkoutInput') createWorkoutInput: CreateWorkoutInput,
  ) {
    const createdWorkout = await this.workoutService.create(createWorkoutInput);
    const populatedWorkout = createdWorkout.populate('plan');
    return populatedWorkout;
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
  async findAll(
    @Args('filter', { nullable: true }) filter: GenericFilterInput,
  ) {
    try {
      const workouts = await this.workoutService.findAll(filter);
      const populatedWorkouts = await Promise.all(
        workouts.map(async (workout) => {
          try {
            const populatedWorkout = await workout.populate('plan');
            return populatedWorkout;
          } catch (error) {
            console.error(`Error populating 'plan' field: ${error.message}`);
            return workout;
          }
        }),
      );
      return populatedWorkouts;
    } catch (error) {
      console.error(`Error finding workouts: ${error.message}`);
      throw new Error('An error occurred while fetching workouts.');
    }
  }

  @Query(() => Workout, { name: 'findWorkoutById' })
  async findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    const workout = await this.workoutService
      .findOne(id)
      .populate({ path: 'createdBy' })
      .populate({ path: 'plan' })
      .exec();

    return workout;
  }
}
