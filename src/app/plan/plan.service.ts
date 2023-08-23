import { Injectable } from '@nestjs/common';
import { CreatePlanInput } from './dto/create-plan.input';
import { UpdatePlanInput } from './dto/update-plan.input';
import { InjectModel } from '@nestjs/mongoose';
import { Plan, PlanDocument } from './entities/plan.entity';
import { Model, Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class PlanService {
  constructor(@InjectModel(Plan.name) private planModel: Model<PlanDocument>) {}
  create(createPlanInput: CreatePlanInput) {
    const newPlan = new this.planModel(createPlanInput);
    return newPlan.save();
  }

  findAll() {
    return `This action returns all plan`;
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    const plan = this.planModel.findById(id);
    return plan;
  }

  update(id: MongooseSchema.Types.ObjectId, updatePlanInput: UpdatePlanInput) {
    return this.planModel.findByIdAndUpdate(id, updatePlanInput);
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.planModel.findByIdAndDelete(id);
  }
}
