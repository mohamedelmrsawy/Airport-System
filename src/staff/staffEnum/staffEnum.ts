import { registerEnumType } from '@nestjs/graphql';

export enum StuffEnum {
  ADMIN = 'Admin',
  PILOT = 'Pilot',
  CREW = 'crew',
  SECURITY = 'Security',
  ETC = 'etc',
}

registerEnumType(StuffEnum, { name: 'StuffEnum' });
