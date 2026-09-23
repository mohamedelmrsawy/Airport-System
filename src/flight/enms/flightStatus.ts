import { registerEnumType } from '@nestjs/graphql';

export enum FlightStatus {
  ONTIME = 'onTime',
  DELAYED = 'Delayed',
  CANCELED = 'Canceled',
  LEAVE = 'Leave',
}

registerEnumType(FlightStatus, { name: 'FlightStatus' });
