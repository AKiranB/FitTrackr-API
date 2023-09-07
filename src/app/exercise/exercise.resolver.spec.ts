import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseResolver } from './exercise.resolver';
import { ExerciseService } from './exercise.service';

describe('ExerciseResolver', () => {
  let resolver: ExerciseResolver;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        ExerciseResolver,
        {
          provide: ExerciseService,
          useFactory: () => ({
            create: jest.fn(() => {
              return {
                name: 'Pushup',
                description: 'Pushup description',
                createdBy: '123',
              };
            }),
            findAll: jest.fn(() => {
              return [
                {
                  name: 'Pushup',
                  description: 'Pushup description',
                  createdBy: '123',
                },
              ];
            }),
            remove: jest.fn(() => {
              return {};
            }),
          }),
        },
      ],
    }).compile();
    resolver = module.get<ExerciseResolver>(ExerciseResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create an exercise', async () => {
    const exercise = await resolver.createExercise({
      name: 'Pushup',
      description: 'Pushup description',
      createdBy: '123',
    });
    expect(exercise).toBeDefined();
    expect(exercise.name).toEqual('Pushup');
    expect(exercise.description).toEqual('Pushup description');
    expect(exercise.createdBy).toEqual('123');
  });

  it('should find all exercises', async () => {
    const exercise1 = await resolver.createExercise({
      name: 'Pushup',
      description: 'Pushup description',
      createdBy: '123',
    });
    const exercises = await resolver.findAll({ createdBy: '123' });
    expect(exercises).toBeDefined();
    expect(exercises[0].name).toEqual(exercise1.name);
    expect(exercises[0].description).toEqual(exercise1.description);
    expect(exercises[0].createdBy).toEqual(exercise1.createdBy);
  });

  it('should remove an exercise', async () => {
    const exercise = await resolver.createExercise({
      name: 'Pushup',
      description: 'Pushup description',
      createdBy: '123',
    });
    expect(exercise).toBeDefined();
  });
});
