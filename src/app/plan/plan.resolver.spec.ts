import { Test, TestingModule } from '@nestjs/testing';
import { PlanResolver } from './plan.resolver';
import { PlanService } from './plan.service';

describe('PlanResolver', () => {
  let resolver: PlanResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanResolver, PlanService],
    }).compile();

    resolver = module.get<PlanResolver>(PlanResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
