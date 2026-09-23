import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { StuffService } from './staff.service';
import { Stuff } from './entities/staff.Entity';
import { StuffDto } from './Dto/staffDto';
import { jwtTypeStaff } from '../types/jwtTypeStaff';
import { StuffRoles } from './decorators/staffDecorator';
import { StuffEnum } from './staffEnum/staffEnum';
import { UseGuards } from '@nestjs/common';
import { StuffRoleGuard } from './guards/staffRoleGuard';

@Resolver()
export class StuffResolver {
  constructor(private readonly stuffService: StuffService) {}

  @Query(() => [Stuff])
  @StuffRoles(
    StuffEnum.ETC,
    StuffEnum.CREW,
    StuffEnum.PILOT,
    StuffEnum.SECURITY,
  )
  @UseGuards(StuffRoleGuard)
  async getAllStuffs() {
    return await this.stuffService.getAllStuff();
  }

  @Query(() => Stuff)
  @StuffRoles(
    StuffEnum.ETC,
    StuffEnum.CREW,
    StuffEnum.PILOT,
    StuffEnum.SECURITY,
  )
  @UseGuards(StuffRoleGuard)
  async getStuff(@Args('id') id: number) {
    return await this.stuffService.getStuffById(id);
  }

  @Mutation(() => Stuff)
  @StuffRoles(StuffEnum.SECURITY, StuffEnum.ADMIN)
  @UseGuards(StuffRoleGuard)
  async createStuff(
    @Args('id') id: number,
    @Args('StuffDto') stuffDto: StuffDto,
    @Args('flightId') flightId?: number,
  ) {
    return await this.stuffService.createStuff(id, stuffDto, flightId);
  }

  @Mutation(() => Stuff)
  @StuffRoles(StuffEnum.SECURITY, StuffEnum.ADMIN)
  @UseGuards(StuffRoleGuard)
  async updateStuff(
    @Args('id') id: number,
    @Args('StuffDto') stuffDto: StuffDto,
  ) {
    return await this.stuffService.updateStuff(id, stuffDto);
  }

  @Mutation(() => Stuff)
  @StuffRoles(StuffEnum.ADMIN)
  @UseGuards(StuffRoleGuard)
  async removeStuff(@Args('id') id: number) {
    return await this.stuffService.deleteStuff(id);
  }

  @Mutation(() => String)
  async login(@Args('stuffJwt') stuffJwt: jwtTypeStaff) {
    return await this.stuffService.stuffLogin(stuffJwt);
  }
}
