import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AirportService } from './airport.service';
import { Airport } from './entities/airport.Entity';
import { CreateAirportDto } from './Dto/createAirportDto';
import { UpdateAirportDto } from './Dto/updateAirportDto';

@Resolver()
export class AirportResolver {
  constructor(private readonly airportService: AirportService) {}

  @Query(() => [Airport])
  async getAllAirport() {
    return await this.airportService.getAllAirport();
  }

  @Query(() => Airport)
  async getAirport(@Args('Id') Id: number) {
    return await this.airportService.getAirport(Id);
  }

  @Mutation(() => Airport)
  async createAirport(
    @Args('Id') Id: number,
    @Args('createAirportDto') createAirportDto: CreateAirportDto,
  ) {
    return await this.airportService.createAirport(Id, createAirportDto);
  }

  @Mutation(() => Airport)
  async updateAirport(
    @Args('Id') Id: number,
    @Args('createAirportDto') updateAirportDto: UpdateAirportDto,
  ) {
    return await this.airportService.updateAirport(Id, updateAirportDto);
  }

  @Mutation(() => Airport)
  async removeAirport(@Args('Id') Id: number) {
    return await this.airportService.removeAirport(Id);
  }
}
