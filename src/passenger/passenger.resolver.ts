import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PassengerService } from './passenger.service';
import { Passenger } from './entities/passenger.Entity';
import { PassengerDto } from './Dto/passengerDto';
import { UseGuards } from '@nestjs/common';
import { StuffRoleGuard } from '../staff/guards/staffRoleGuard';
import { StuffRoles } from '../staff/decorators/staffDecorator';
import { StuffEnum } from '../staff/staffEnum/staffEnum';

@Resolver(() => Passenger)
export class PassengerResolver {
  constructor(private readonly passengerService: PassengerService) {}

  @Query(() => Passenger)
  @StuffRoles(StuffEnum.ETC)
  @UseGuards(StuffRoleGuard)
  async getPassenger(@Args('id') id: number) {
    return await this.passengerService.findPassengerById(id);
  }

  @Mutation(() => Passenger)
  @StuffRoles(StuffEnum.SECURITY)
  @UseGuards(StuffRoleGuard)
  async addPassenger(@Args('passengerDto') passengerDto: PassengerDto) {
    const newPassenger =
      await this.passengerService.registerPassenger(passengerDto);
    return newPassenger;
  }
}
