import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SeatService } from './seat.service';
import { Seat } from './entities/seat.Entity';
import { SeatDto } from './Dto/seatDto';
import { StuffRoles } from '../staff/decorators/staffDecorator';
import { StuffEnum } from '../staff/staffEnum/staffEnum';
import { UseGuards } from '@nestjs/common';
import { StuffRoleGuard } from '../staff/guards/staffRoleGuard';

@Resolver()
export class SeatResolver {
  constructor(private readonly seatService: SeatService) {}

  @Query(() => Seat)
  @StuffRoles(StuffEnum.ADMIN, StuffEnum.ETC)
  @UseGuards(StuffRoleGuard)
  async getSeat(@Args('Id') Id: number) {
    return await this.seatService.getSeat(Id);
  }

  @Query(() => [Seat])
  @StuffRoles(StuffEnum.ADMIN, StuffEnum.ETC, StuffEnum.CREW)
  @UseGuards(StuffRoleGuard)
  async GetAllSeat() {
    return await this.seatService.getAllSeat();
  }

  @Mutation(() => Seat)
  @StuffRoles(StuffEnum.ADMIN, StuffEnum.SECURITY)
  @UseGuards(StuffRoleGuard)
  async addSeat(
    @Args('Id') Id: number,
    @Args('seatDto') seatDto: SeatDto,
    @Args('flightId') flightId: number,
  ) {
    return await this.seatService.createBag(Id, seatDto, flightId);
  }

  @Mutation(() => Seat)
  @StuffRoles(StuffEnum.ADMIN)
  @UseGuards(StuffRoleGuard)
  async updateSeat(@Args('Id') Id: number, @Args('seatDto') seatDto: SeatDto) {
    return await this.seatService.updateSeat(Id, seatDto);
  }

  @Mutation(() => Seat)
  @StuffRoles(StuffEnum.ADMIN, StuffEnum.CREW, StuffEnum.SECURITY)
  @UseGuards(StuffRoleGuard)
  async removeSeat(@Args('Id') Id: number) {
    return await this.seatService.removeAirport(Id);
  }
}
