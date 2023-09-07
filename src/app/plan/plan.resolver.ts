import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PlanService } from './plan.service';
import { Plan } from './entities/plan.entity';
import { CreatePlanInput } from './dto/create-plan.input';
import { UpdatePlanInput } from './dto/update-plan.input';
import { Schema as MongooseSchema } from 'mongoose';
import { GenericFilterInput } from '../common/inputs/filter-input';

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
    const plans = await this.planService.findAll(filter).populate('createdBy');
    return plans;
  }

  @Query(() => Plan, { name: 'findPlanById' })
  async findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    const plan = await this.planService
      .findOne(id)
      .populate({ path: 'createdBy' })
      .exec();

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
