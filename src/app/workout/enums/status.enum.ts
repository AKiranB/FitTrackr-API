import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  PLANNED = 'PENDING',
  COMPLETED = 'COMPLETED',
  MISSED = 'MISSED',
  CANCELED = 'CANCELED',
}

registerEnumType(Status, {
  name: 'Status',
  description: 'Possible status values for a workout',
});
