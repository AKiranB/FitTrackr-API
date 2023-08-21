import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Schema } from '@nestjs/mongoose';
import { Exercise } from '../../exercise/entities/exercise.entity';

@Schema()
export class ExerciseRep {
  @Prop({ type: Types.ObjectId, ref: 'Exercise' })
  exerciseId: Exercise;

  @Prop()
  repetitions: number;
}

export const ExerciseRepSchema = SchemaFactory.createForClass(ExerciseRep);
