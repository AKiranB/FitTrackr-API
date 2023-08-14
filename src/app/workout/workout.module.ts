import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutResolver } from './workout.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from './entities/workout.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }]),
  ],
  providers: [WorkoutResolver, WorkoutService],
})
export class WorkoutModule {}
