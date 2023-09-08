import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutService } from './workout.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../common/helpers/mongoose.helper';
import { Workout, WorkoutSchema } from './entities/workout.entity';
import { PlanService } from '../plan/plan.service';
import { Plan, PlanSchema } from '../plan/entities/plan.entity';
import { Status } from './enums/status.enum';

const workoutInfo = {
  createdBy: '1234',
  duration: 20,
  date: '2021-01-01',
  status: Status.PLANNED,
  time: '10:00',
};

const planInfo = {
  name: 'plan',
  createdBy: '1234',
  description: 'plan',
  exercises: [{ exerciseID: '1234', sets: 3, reps: 10 }],
};

describe('WorkoutService', () => {
  let workoutService: WorkoutService;
  let module: TestingModule;

  let planService: PlanService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [WorkoutService, PlanService],
      imports: [
        rootMongooseTestModule(),
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
          {
            name: Workout.name,
            schema: WorkoutSchema,
          },

          {
            name: Plan.name,
            schema: PlanSchema,
          },
        ]),
      ],
    }).compile();
    workoutService = module.get<WorkoutService>(WorkoutService);
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
    const plan = await planService.create({
      ...planInfo,
    });

    const workout = await workoutService.create({
      plan: plan._id as unknown as string,
      ...workoutInfo,
    });

    expect(workout).toBeDefined();
    expect(workout.createdBy).toEqual(workoutInfo.createdBy);
    expect(workout.duration).toEqual(workoutInfo.duration);
    expect(workout.date).toEqual(workoutInfo.date);
    expect(workout.status).toEqual(workoutInfo.status);
    expect(workout.plan).toBeDefined();
    expect(workout.plan).toEqual(plan._id);
  });

  it('should find all workouts', async () => {
    const plan = await planService.create({
      ...planInfo,
    });

    await workoutService.create({
      plan: plan._id as unknown as string,
      ...workoutInfo,
    });

    const workouts = await workoutService.findAll();
    expect(workouts).toBeDefined();
    expect(workouts.length).toEqual(1);
    expect(workouts[0].createdBy).toEqual(workoutInfo.createdBy);
    expect(workouts[0].duration).toEqual(workoutInfo.duration);
    expect(workouts[0].date).toEqual(workoutInfo.date);
    expect(workouts[0].status).toEqual(workoutInfo.status);
    expect(workouts[0].plan).toBeDefined();
    expect(workouts[0].plan).toEqual(plan._id);
  });

  it('should find a workout by id', async () => {
    const plan = await planService.create({
      ...planInfo,
    });

    const workout = await workoutService.create({
      plan: plan._id as unknown as string,
      ...workoutInfo,
    });

    const foundWorkout = await workoutService.findOne(workout._id);
    expect(foundWorkout).toBeDefined();
    expect(foundWorkout.createdBy).toEqual(workoutInfo.createdBy);
    expect(foundWorkout.duration).toEqual(workoutInfo.duration);
    expect(foundWorkout.date).toEqual(workoutInfo.date);
    expect(foundWorkout.status).toEqual(workoutInfo.status);
    expect(foundWorkout.plan).toBeDefined();
    expect(foundWorkout.plan).toEqual(plan._id);
  });

  it('should update a workout', async () => {
    const plan = await planService.create({
      ...planInfo,
    });

    const workout = await workoutService.create({
      plan: plan._id as unknown as string,
      ...workoutInfo,
    });

    const updatedWorkout = await workoutService.update(workout._id, {
      _id: workout._id,
      ...workoutInfo,
      duration: 30,
    });

    expect(updatedWorkout).toBeDefined();
    expect(updatedWorkout.createdBy).toEqual(workoutInfo.createdBy);
    expect(updatedWorkout.duration).toEqual(30);
    expect(updatedWorkout.date).toEqual(workoutInfo.date);
    expect(updatedWorkout.status).toEqual(workoutInfo.status);
    expect(updatedWorkout.plan).toBeDefined();
    expect(updatedWorkout.plan).toEqual(plan._id);
  });

  it('should delete a workout', async () => {
    const plan = await planService.create({
      ...planInfo,
    });

    const workout = await workoutService.create({
      plan: plan._id as unknown as string,
      ...workoutInfo,
    });

    const deletedWorkout = await workoutService.remove(workout._id);

    expect(deletedWorkout).toBeDefined();
    expect(deletedWorkout.createdBy).toEqual(workoutInfo.createdBy);
    expect(deletedWorkout.duration).toEqual(workoutInfo.duration);
    expect(deletedWorkout.date).toEqual(workoutInfo.date);
    expect(deletedWorkout.status).toEqual(workoutInfo.status);
    expect(deletedWorkout.plan).toBeDefined();
    expect(deletedWorkout.plan).toEqual(plan._id);

    const allWorkouts = await workoutService.findAll();
    expect(allWorkouts).toBeDefined();
    expect(allWorkouts.length).toEqual(0);
  });
});
