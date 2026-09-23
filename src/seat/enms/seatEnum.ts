import { registerEnumType } from '@nestjs/graphql';

export enum SeatStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

registerEnumType(SeatStatus, { name: 'SeatStatus' });
