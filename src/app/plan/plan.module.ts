import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanResolver } from './plan.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanSchema } from './entities/plan.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Plan', schema: PlanSchema }])],
  providers: [PlanResolver, PlanService],
})
export class PlanModule {}
