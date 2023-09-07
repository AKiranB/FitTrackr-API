import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseService } from './exercise.service';
import { Exercise, ExerciseSchema } from './entities/exercise.entity';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { rootMongooseTestModule } from '../common/helpers/mongoose.helper';

describe('ExerciseService', () => {
  let service: ExerciseService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [ExerciseService],
      imports: [
        rootMongooseTestModule(),
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
          {
            name: Exercise.name,
            schema: ExerciseSchema,
          },
        ]),
      ],
    }).compile();
    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an exercise', async () => {
    const exercise = await service.create({
      name: 'Pushup',
      description: 'Pushup description',
      createdBy: '123',
    });
    expect(exercise).toBeDefined();
    expect(exercise.name).toEqual('Pushup');
    expect(exercise.description).toEqual('Pushup description');
    expect(exercise.createdBy).toEqual('123');
  });

  it('should find all exercises with a filter', async () => {
    const exercise1 = await service.create({
      name: 'Pushup',
      description: 'Pushup description',
      createdBy: '123',
    });
    await service.create({
      name: 'Sit Up',
      description: 'Sit Up description',
      createdBy: '124',
    });
    const exercises = await service.findAll({ createdBy: '123' });
    expect(exercises).toBeDefined();
    expect(exercises[0].name).toEqual(exercise1.name);
    expect(exercises[0].description).toEqual(exercise1.description);
    expect(exercises[0].createdBy).toEqual(exercise1.createdBy);
  });

  it('should remove an exercise', async () => {
    const exercise = await service.create({
      name: 'Pushup',
      description: 'Pushup description',
      createdBy: '123',
    });
    await service.remove(exercise._id);
    const exercises = await service.findAll();
    expect(exercises).toStrictEqual([]);
  });
});
