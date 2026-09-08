import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { StuffService } from './stuff.service';
import { Stuff } from './entity/stuffEntity';
import { StuffDto } from './Dto/stuffDto';
import { StuffJwtType } from '../types/stuffJwtType';

@Resolver()
export class StuffResolver {
  constructor(private readonly stuffService: StuffService) {}

  @Query(() => [Stuff])
  async getAllStuffs() {
    return await this.stuffService.getAllStuff();
  }

  @Query(() => Stuff)
  async getStuff(@Args('id') id: number) {
    return await this.stuffService.getStuffById(id);
  }

  @Mutation(() => Stuff)
  async createStuff(
    @Args('id') id: number,
    @Args('StuffDto') stuffDto: StuffDto,
    @Args('flightId') flightId: number,
  ) {
    return await this.stuffService.createStuff(id, stuffDto, flightId);
  }

  @Mutation(() => Stuff)
  async updateStuff(
    @Args('id') id: number,
    @Args('StuffDto') stuffDto: StuffDto,
  ) {
    return await this.stuffService.updateStuff(id, stuffDto);
  }

  @Mutation(() => Stuff)
  async removeStuff(@Args('id') id: number) {
    return await this.stuffService.deleteStuff(id);
  }

  @Mutation(() => Stuff)
  async login(@Args('stuffJwt') stuffJwt: StuffJwtType) {
    return await this.stuffService.stuffLogin(stuffJwt);
  }
}
