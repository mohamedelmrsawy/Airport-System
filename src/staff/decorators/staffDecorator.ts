import { SetMetadata } from '@nestjs/common';
import { StuffEnum } from '../staffEnum/staffEnum';

export const StuffRoles = (...roles: StuffEnum[]) =>
  SetMetadata('stuffRole', roles);
