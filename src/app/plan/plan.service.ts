import { Injectable } from '@nestjs/common';
import { CreatePlanInput } from './dto/create-plan.input';
import { UpdatePlanInput } from './dto/update-plan.input';
import { InjectModel } from '@nestjs/mongoose';
import { Plan, PlanDocument } from './entities/plan.entity';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { GenericFilterInput } from '../common/inputs/filter-input';

@Injectable()
export class PlanService {
  constructor(@InjectModel(Plan.name) private planModel: Model<PlanDocument>) {}
  create(createPlanInput: CreatePlanInput) {
    const newPlan = new this.planModel(createPlanInput);
    return newPlan.save();
  }

  findAll(filter: GenericFilterInput) {
    const plans = this.planModel.find({ createdBy: filter.createdBy });
    return plans;
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    const plan = this.planModel.findById(id);
    return plan;
  }

  update(id: MongooseSchema.Types.ObjectId, updatePlanInput: UpdatePlanInput) {
    return this.planModel.findByIdAndUpdate(id, updatePlanInput, { new: true });
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.planModel.findByIdAndDelete(id);
  }
}
