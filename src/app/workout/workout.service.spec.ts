import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutService } from './workout.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../common/helpers/mongoose.helper';
import { Workout, WorkoutSchema } from './entities/workout.entity';
import { UserService } from '../user/user.service';
import { PlanService } from '../plan/plan.service';
import { Plan, PlanSchema } from '../plan/entities/plan.entity';
import { User, UserSchema } from '../user/entities/user.entity';

describe('WorkoutService', () => {
  let workoutService: WorkoutService;
  let module: TestingModule;
  let userService: UserService;
  let planService: PlanService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [WorkoutService, UserService, PlanService],
      imports: [
        rootMongooseTestModule(),
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
          {
            name: Workout.name,
            schema: WorkoutSchema,
          },
          {
            name: User.name,
            schema: UserSchema,
          },
          {
            name: Plan.name,
            schema: PlanSchema,
          },
        ]),
      ],
    }).compile();
    workoutService = module.get<WorkoutService>(WorkoutService);
    userService = module.get<UserService>(UserService);
    planService = module.get<PlanService>(PlanService);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeInMongodConnection();
    }
  });

  it('should be defined', () => {
    expect(workoutService).toBeDefined();
  });

  it('should create a workout', async () => {
    const user = await userService.create({
      email: 'dog@gmail.com',
      name: 'dog',
      password: 'dog123',
    });
    const plan = await planService.create({
      name: 'plan',
      createdBy: String(user._id),
      description: 'plan',
      exercises: [],
    });
  });
});
