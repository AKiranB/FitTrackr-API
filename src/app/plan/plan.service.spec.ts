import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../common/helpers/mongoose.helper';
import { PlanService } from './plan.service';
import { Plan, PlanSchema } from './entities/plan.entity';
import { ExerciseService } from '../exercise/exercise.service';
import { Exercise, ExerciseSchema } from '../exercise/entities/exercise.entity';

const exerciseTest = {
  name: 'Pushup',
  description: 'Pushup description',
  createdBy: '123',
};

describe('PlanService', () => {
  let planService: PlanService;
  let exerciseService: ExerciseService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [PlanService, ExerciseService],
      imports: [
        rootMongooseTestModule(),
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
          {
            name: Plan.name,
            schema: PlanSchema,
          },
          {
            name: Exercise.name,
            schema: ExerciseSchema,
          },
        ]),
      ],
    }).compile();
    planService = module.get<PlanService>(PlanService);
    exerciseService = module.get<ExerciseService>(ExerciseService);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeInMongodConnection();
    }
  });

  it('should be defined', () => {
    expect(planService).toBeDefined();
  });

  it('should create a plan', async () => {
    const exercise = await exerciseService.create({
      ...exerciseTest,
    });
    const plan = await planService.create({
      name: 'Test Plan',
      description: 'Test Plan Description',
      createdBy: '123',
      exercises: [{ exerciseID: String(exercise._id), sets: 3, reps: 10 }],
    });
    expect(plan).toBeDefined();
    expect(plan.name).toEqual('Test Plan');
    expect(plan.description).toEqual('Test Plan Description');
    expect(plan.createdBy).toEqual('123');
    expect(plan.exercises[0].reps).toEqual(10);
    expect(plan.exercises[0].sets).toEqual(3);
  });

  it('should find all plans', async () => {
    const exercise = await exerciseService.create({
      ...exerciseTest,
    });
    const plan = await planService.create({
      name: 'Test Plan',
      description: 'Test Plan Description',
      createdBy: '123',
      exercises: [{ exerciseID: String(exercise._id), sets: 3, reps: 10 }],
    });
  });
});
