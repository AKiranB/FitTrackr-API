import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PlanService } from './plan.service';
import { Plan } from './entities/plan.entity';
import { CreatePlanInput } from './dto/create-plan.input';
import { UpdatePlanInput } from './dto/update-plan.input';
import { Schema as MongooseSchema } from 'mongoose';
import { GenericFilterInput } from '../common/inputs/filter-input';
import { PlannedExercises } from './entities/plan.entity';

@Resolver(() => Plan)
export class PlanResolver {
  constructor(private readonly planService: PlanService) {}

  @Mutation(() => Plan)
  createPlan(@Args('createPlanInput') createPlanInput: CreatePlanInput) {
    return this.planService.create(createPlanInput);
  }

  @Query(() => [Plan], { name: 'findAllPlans' })
  async findAll(
    @Args('filter', { nullable: true }) filter: GenericFilterInput,
  ) {
    try {
      const plans = await this.planService.findAll(filter);
      const populatedPlans = await Promise.all(
        plans.map(async (plan) => {
          try {
            const populatedPlan = await plan.populate('exercises.exerciseID');
            return populatedPlan;
          } catch (error) {
            console.error(`Error populating 'plan' field: ${error.message}`);
            return plan;
          }
        }),
      );
      return populatedPlans;
    } catch (error) {
      console.error(`Error finding workouts: ${error.message}`);
      throw new Error('An error occurred while fetching workouts.');
    }
  }

  @Query(() => Plan, { name: 'findPlanById' })
  async findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    const plan = await this.planService
      .findOne(id)
      .populate({ path: 'createdBy' })
      .exec();

    console.log(plan);

    return plan;
  }

  @Mutation(() => Plan)
  updatePlan(@Args('updatePlanInput') updatePlanInput: UpdatePlanInput) {
    return this.planService.update(updatePlanInput._id, updatePlanInput);
  }

  @Mutation(() => Plan)
  removePlan(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.planService.remove(id);
  }
}
