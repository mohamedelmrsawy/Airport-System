import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { FlightService } from './flight.service';
import { Flight } from './entity/flightEntity';
import { StuffService } from '../stuff/stuff.service';
import { FlightDto } from './dto/flightDto';
import { FlightUpdateDto } from './dto/flightUpdateDto';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { StuffRoleGuard } from '../stuff/guards/stuffRoleGuard';
import { StuffRoles } from '../stuff/decorators/stuffDecorator';
import { StuffEnum } from '../stuff/stuffEnum/stuffEnum';

const pubSub = new PubSub();

@Resolver(() => Flight)
export class FlightResolver {
  constructor(
    private readonly flightService: FlightService,
    private readonly stuffSrvice: StuffService,
  ) {}

  @Query(() => [Flight])
  @StuffRoles(StuffEnum.ETC)
  @UseGuards(StuffRoleGuard)
  async getAllFlight() {
    return this.flightService.findAll();
  }

  @Query(() => Flight)
  @StuffRoles(StuffEnum.ETC)
  @UseGuards(StuffRoleGuard)
  async getFlight(@Args('id') id: number) {
    return await this.flightService.findOne(id);
  }

  @Mutation(() => Flight)
  @StuffRoles(StuffEnum.SECURITY)
  @UseGuards(StuffRoleGuard)
  async addFlight(
    @Args('flightDto') flightDto: FlightDto,
    @Args('id') id: number,
    @Args('airportId') airportId: number,
  ) {
    const newFlight = this.flightService.create(id, flightDto, airportId);
    return newFlight;
  }

  @Mutation(() => Flight)
  @StuffRoles(StuffEnum.SECURITY)
  @UseGuards(StuffRoleGuard)
  async updateFlight(
    @Args('id') id: number,
    @Args('flightUpdateDto') flightUpdateDto: FlightUpdateDto,
  ) {
    const newFlight = await this.flightService.update(id, flightUpdateDto);
    await pubSub.publish('changFlightStatus', { changFlightStatus: newFlight });
    return newFlight;
  }

  @Mutation(() => Flight)
  @StuffRoles(StuffEnum.SECURITY, StuffEnum.CREW)
  @UseGuards(StuffRoleGuard)
  async removeFlight(@Args('id') id: number) {
    const flight = await this.flightService.remove(id);
    return flight;
  }

  @Subscription(() => Flight)
  @StuffRoles(StuffEnum.SECURITY)
  @UseGuards(StuffRoleGuard)
  changFlightStatus() {
    return pubSub.asyncIterableIterator('changFlightStatus');
  }
}
