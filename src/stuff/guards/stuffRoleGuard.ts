import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { StuffJwtType } from '../../types/stuffJwtType';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { StuffEnum } from '../stuffEnum/stuffEnum';
import { StuffRoles } from '../decorators/stuffDecorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Stuff } from '../entity/stuffEntity';
import { Repository } from 'typeorm';

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
      const request: Request = context.switchToHttp().getRequest();

      const [type, token] = request.headers.authorization?.split(' ') ?? [];

      if (type !== 'parar' || !token) {
        return false;
      }

      const stuff: StuffJwtType = await this.jwtService.verifyAsync(token, {
        secret: this.configer.get<string>('JWT_SECRET'),
      });

      const existingStuff = await this.stuffReposatory.findOne({
        where: { Name: stuff.Name },
      });

      if (existingStuff) {
        return true;
      }

      const roles: StuffEnum[] = await this.reflector.getAllAndOverride(
        StuffRoles,
        [context.getHandler(), context.getClass()],
      );

      if (roles.includes(stuff.role as StuffEnum)) {
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
