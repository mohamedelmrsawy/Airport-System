import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtTypeStaff } from '../../types/jwtTypeStaff';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { StuffEnum } from '../staffEnum/staffEnum';
import { InjectRepository } from '@nestjs/typeorm';
import { Stuff } from '../entities/staff.Entity';
import { Repository } from 'typeorm';
import { GqlExecutionContext } from '@nestjs/graphql';

export class StuffRoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configer: ConfigService,
    private readonly reflector: Reflector,
    @InjectRepository(Stuff)
    private readonly stuffReposatory: Repository<Stuff>,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      const GqlContext = GqlExecutionContext.create(context);
      const request = GqlContext.getContext<{ req: Request }>().req;

      const [type, token] = request.headers.authorization?.split(' ') ?? [];

      if (type !== 'Bearer' || !token) {
        return false;
      }

      const stuff: jwtTypeStaff = await this.jwtService.verifyAsync(token, {
        secret: this.configer.get<string>('JWT_SECRET'),
      });

      const existingStuff = await this.stuffReposatory.findOne({
        where: { Name: stuff.Name },
      });

      if (!existingStuff) {
        return false;
      }

      const Roles = this.reflector.getAllAndOverride<StuffEnum[]>('stuffRole', [
        context.getClass(),
        context.getHandler(),
      ]);

      console.log(`roles ${Roles[0]}`);

      if (Roles.includes(stuff.Role as StuffEnum)) {
        request['stuff'] = stuff;
        return true;
      }

      return false;
    } catch (er) {
      console.log(er);
      return false;
    }
  }
}

//const Roles: StuffEnum[] = await this.reflector.getAllAndOverride(
//StuffRoles,
//[context.getHandler(), context.getClass()],
//);
