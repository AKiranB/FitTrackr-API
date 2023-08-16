import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

registerEnumType(Status, {
  name: 'Status',
  description: 'Possible status values for a workout',
});
