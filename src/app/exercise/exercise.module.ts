import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseResolver } from './exercise.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from './entities/exercise.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  providers: [ExerciseResolver, ExerciseService],
})
export class ExerciseModule {}
