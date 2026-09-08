import { registerEnumType } from '@nestjs/graphql';

export enum BagStatus {
  CHECKED_IN = 'Checked In',
  LOADED = 'Loaded',
  IN_TRANSIT = 'In Transit',
  LOST = 'Lost',
}

registerEnumType(BagStatus, { name: 'BagStatus' });
