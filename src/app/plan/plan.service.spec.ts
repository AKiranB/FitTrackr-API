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
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/entities/user.entity';

const exerciseTest = {
  name: 'Pushup',
  description: 'Pushup description',
  createdBy: '123',
};

describe('PlanService', () => {
  let planService: PlanService;
  let exerciseService: ExerciseService;
  let userService: UserService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [PlanService, ExerciseService, UserService],
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
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
    }).compile();
    planService = module.get<PlanService>(PlanService);
    exerciseService = module.get<ExerciseService>(ExerciseService);
    userService = module.get<UserService>(UserService);
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

  it('should find all plans with a filter', async () => {
    const user = await userService.create({
      name: 'test user',
      email: 'test@gmail.com',
      password: 'test123',
    });
    const exercise = await exerciseService.create({
      ...exerciseTest,
    });
    const plan = await planService.create({
      name: 'Test Plan',
      description: 'Test Plan Description',
      createdBy: String(user._id),
      exercises: [{ exerciseID: String(exercise._id), sets: 3, reps: 10 }],
    });
    const plans = await planService.findAll({ createdBy: String(user._id) });

    expect(plans).toBeDefined();
    expect(plans[0].name).toEqual(plan.name);
    expect(plans[0].description).toEqual(plan.description);
    expect(plans[0].createdBy).toEqual(plan.createdBy);
  });

  it('should find a plan by id', async () => {
    const user = await userService.create({
      name: 'test user',
      email: 'test@gmail.com',
      password: 'test123',
    });
    const exercise = await exerciseService.create({
      ...exerciseTest,
    });
    const plan = await planService.create({
      name: 'Test Plan',
      description: 'Test Plan Description',
      createdBy: String(user._id),
      exercises: [{ exerciseID: String(exercise._id), sets: 3, reps: 10 }],
    });
    const foundPlan = await planService.findOne(plan._id);

    expect(foundPlan).toBeDefined();
    expect(foundPlan.name).toEqual(plan.name);
    expect(foundPlan.description).toEqual(plan.description);
    expect(foundPlan.createdBy).toEqual(plan.createdBy);
  });

  it('should update a plan', async () => {
    const user = await userService.create({
      name: 'test user',
      email: 'test@gmail.com',
      password: 'test123',
    });
    const exercise = await exerciseService.create({
      ...exerciseTest,
    });
    const plan = await planService.create({
      name: 'Test Plan',
      description: 'Test Plan Description',
      createdBy: String(user._id),
      exercises: [{ exerciseID: String(exercise._id), sets: 3, reps: 10 }],
    });

    const updatedPlan = await planService.update(plan._id, {
      _id: plan._id,
      name: 'Updated Plan',
      description: 'Updated Plan Description',
      createdBy: String(user._id),
      exercises: [{ exerciseID: String(exercise._id), sets: 3, reps: 10 }],
    });

    expect(updatedPlan).toBeDefined();
    expect(updatedPlan.name).toEqual('Updated Plan');
    expect(updatedPlan.description).toEqual('Updated Plan Description');
    expect(updatedPlan.createdBy).toEqual(String(user._id));
  });

  it('should delete a plan', async () => {
    const user = await userService.create({
      name: 'test user',
      email: 'test@gmail.com',
      password: 'test123',
    });
    const exercise = await exerciseService.create({
      ...exerciseTest,
    });
    const plan = await planService.create({
      name: 'Test Plan',
      description: 'Test Plan Description',
      createdBy: String(user._id),
      exercises: [{ exerciseID: String(exercise._id), sets: 3, reps: 10 }],
    });

    const deletedPlan = await planService.remove(plan._id);
    expect(deletedPlan).toBeDefined();
    expect(deletedPlan.name).toEqual(plan.name);
    expect(deletedPlan.description).toEqual(plan.description);
    expect(deletedPlan.createdBy).toEqual(plan.createdBy);

    const allPlans = await planService.findAll({ createdBy: String(user._id) });

    expect(allPlans).toStrictEqual([]);
  });
});
