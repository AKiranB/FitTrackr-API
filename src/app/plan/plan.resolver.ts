import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PlanService } from './plan.service';
import { Plan } from './entities/plan.entity';
import { CreatePlanInput } from './dto/create-plan.input';
import { UpdatePlanInput } from './dto/update-plan.input';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => Plan)
export class PlanResolver {
  constructor(private readonly planService: PlanService) {}

  @Mutation(() => Plan)
  createPlan(@Args('createPlanInput') createPlanInput: CreatePlanInput) {
    return this.planService.create(createPlanInput);
  }

  @Query(() => [Plan], { name: 'findAllPlans' })
  findAll() {
    return this.planService.findAll();
  }

  @Query(() => Plan, { name: 'findPlanById' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.planService.findOne(id);
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
