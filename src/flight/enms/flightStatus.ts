import { registerEnumType } from '@nestjs/graphql';

export enum FlightStatus {
  ONTIME = 'onTime',
  DELAYED = 'Delayed',
  CANCELED = 'Canceled',
}

registerEnumType(FlightStatus, { name: 'FlightStatus' });
