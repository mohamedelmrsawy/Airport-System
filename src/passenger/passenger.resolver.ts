import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PassengerService } from './passenger.service';
import { Passenger } from './entity/passengerEntity';
import { PassengerDto } from './Dto/passengerDto';

@Resolver(() => Passenger)
export class PassengerResolver {
  constructor(private readonly passengerService: PassengerService) {}

  @Query(() => Passenger)
  async getPassenger(@Args('id') id: number) {
    return await this.passengerService.findPassengerById(id);
  }

  @Mutation(() => Passenger)
  async addPassenger(@Args('passengerDto') passengerDto: PassengerDto) {
    const newPassenger =
      await this.passengerService.RegisterPassenger(passengerDto);
    return newPassenger;
  }
}
