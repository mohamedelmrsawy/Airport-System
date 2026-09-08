import { SetMetadata } from '@nestjs/common';
import { StuffEnum } from '../stuffEnum/stuffEnum';

export const StuffRoles = (...roles: StuffEnum[]) =>
  SetMetadata('stuffRole', roles);
