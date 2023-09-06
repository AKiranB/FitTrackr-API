import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExerciseService } from './exercise.service';
import { Exercise } from './entities/exercise.entity';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { GenericFilterInput } from '../common/inputs/filter-input';

@Resolver(() => Exercise)
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Mutation(() => Exercise)
  createExercise(
    @Args('createExerciseInput') createExerciseInput: CreateExerciseInput,
  ) {
    return this.exerciseService.create(createExerciseInput);
  }

  @Query(() => [Exercise], { name: 'findAllExercises' })
  findAll(@Args('filter', { nullable: true }) filter: GenericFilterInput) {
    return this.exerciseService.findAll(filter);
  }

  @Mutation(() => Exercise)
  removeExercise(@Args('id', { type: () => Int }) id: number) {
    return this.exerciseService.remove(id);
  }
}
