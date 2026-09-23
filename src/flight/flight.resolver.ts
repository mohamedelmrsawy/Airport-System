import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { FlightService } from './flight.service';
import { Flight } from './entities/flight.Entity';
import { StuffService } from '../staff/staff.service';
import { FlightDto } from './dto/flightDto';
import { FlightUpdateDto } from './dto/flightUpdateDto';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { StuffRoleGuard } from '../staff/guards/staffRoleGuard';
import { StuffRoles } from '../staff/decorators/staffDecorator';
import { StuffEnum } from '../staff/staffEnum/staffEnum';
import { FlightFilter } from './filterInterface/filterType';
import { Stuff } from '../staff/entities/staff.Entity';
import DataLoader from 'dataloader';

@Resolver(() => Flight)
export class FlightResolver {
  private pubSub: PubSub;
  constructor(
    private readonly flightService: FlightService,
    private readonly stuffSrvice: StuffService,
  ) {
    this.pubSub = new PubSub();
  }

  @Query(() => [Flight])
  @StuffRoles(StuffEnum.ETC, StuffEnum.CREW, StuffEnum.PILOT, StuffEnum.ADMIN)
  @UseGuards(StuffRoleGuard)
  async getAllFlight(
    @Args('flightIds', { type: () => [Number], nullable: true })
    flightIds?: number[],
    @Args('filter', { nullable: true }) filter?: FlightFilter,
    @Args('page', { defaultValue: 1 }) page?: number,
    @Args('take', { defaultValue: 10 }) take?: number,
  ) {
    return this.flightService.findAll(flightIds, filter, page, take);
  }

  @ResolveField(() => [Stuff])
  stuff(
    @Parent() flight: Flight,
    @Context() context: { stuffLoader: DataLoader<number, Stuff[]> },
  ) {
    return context.stuffLoader.load(flight.Id);
  }

  @Query(() => Flight)
  @StuffRoles(
    StuffEnum.ETC,
    StuffEnum.CREW,
    StuffEnum.PILOT,
    StuffEnum.SECURITY,
  )
  @UseGuards(StuffRoleGuard)
  async getFlight(@Args('id') id: number) {
    return await this.flightService.findOne(id);
  }

  @Mutation(() => Flight)
  @StuffRoles(StuffEnum.SECURITY, StuffEnum.ADMIN)
  @UseGuards(StuffRoleGuard)
  async addFlight(
    @Args('flightDto') flightDto: FlightDto,
    @Args('id') id: number,
    @Args('airportId') airportId: number,
  ) {
    const newFlight = await this.flightService.create(id, flightDto, airportId);
    return newFlight;
  }

  @Mutation(() => Flight)
  @StuffRoles(StuffEnum.SECURITY, StuffEnum.ADMIN)
  @UseGuards(StuffRoleGuard)
  async updateFlight(
    @Args('id') id: number,
    @Args('flightUpdateDto') flightUpdateDto: FlightUpdateDto,
  ) {
    const newFlight = await this.flightService.update(id, flightUpdateDto);
    await this.pubSub.publish('changFlightStatus', {
      changFlightStatus: newFlight,
    });
    return newFlight;
  }

  @Mutation(() => Flight)
  @StuffRoles(StuffEnum.SECURITY, StuffEnum.CREW, StuffEnum.ADMIN)
  @UseGuards(StuffRoleGuard)
  async removeFlight(@Args('id') id: number) {
    const flight = await this.flightService.remove(id);
    return flight;
  }

  @Subscription(() => Flight)
  @StuffRoles(
    StuffEnum.ETC,
    StuffEnum.ADMIN,
    StuffEnum.CREW,
    StuffEnum.PILOT,
    StuffEnum.SECURITY,
  )
  @UseGuards(StuffRoleGuard)
  changFlightStatus() {
    return this.pubSub.asyncIterableIterator('changFlightStatus');
  }
}
