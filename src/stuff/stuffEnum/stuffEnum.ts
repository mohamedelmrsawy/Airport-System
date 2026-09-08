import { registerEnumType } from '@nestjs/graphql';

export enum StuffEnum {
  PILOT = 'Pilot',
  CREW = 'crew',
  SECURITY = 'Security',
  ETC = 'etc',
}

registerEnumType(StuffEnum, { name: 'StuffEnum' });
