import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlanService } from './plan.service';
import { Plan } from './entities/plan.entity';
import { CreatePlanInput } from './dto/create-plan.input';
import { UpdatePlanInput } from './dto/update-plan.input';

@Resolver(() => Plan)
export class PlanResolver {
  constructor(private readonly planService: PlanService) {}

  @Mutation(() => Plan)
  createPlan(@Args('createPlanInput') createPlanInput: CreatePlanInput) {
    return this.planService.create(createPlanInput);
  }

  @Query(() => [Plan], { name: 'plan' })
  findAll() {
    return this.planService.findAll();
  }

  @Query(() => Plan, { name: 'plan' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.planService.findOne(id);
  }

  @Mutation(() => Plan)
  updatePlan(@Args('updatePlanInput') updatePlanInput: UpdatePlanInput) {
    return this.planService.update(updatePlanInput.id, updatePlanInput);
  }

  @Mutation(() => Plan)
  removePlan(@Args('id', { type: () => Int }) id: number) {
    return this.planService.remove(id);
  }
}
