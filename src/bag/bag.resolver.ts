import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BagService } from './bag.service';
import { Bag } from './entities/bag.Entity';
import { UpdateBagtDto } from './Dto/updateBagDto';

@Resolver()
export class BagResolver {
  constructor(private readonly bagService: BagService) {}

  @Query(() => Bag)
  async getBag(@Args('Id') Id: number) {
    return await this.bagService.getBag(Id);
  }

  @Query(() => [Bag])
  async getAllBag() {
    return await this.bagService.getAllBag();
  }

  @Mutation(() => Bag)
  async createBag(
    @Args('Id') Id: number,
    @Args('passengerId') passengerId: number,
    @Args('updateBagtDto') updateBagtDto: UpdateBagtDto,
  ) {
    return await this.bagService.createBag(Id, passengerId, updateBagtDto);
  }

  @Mutation(() => Bag)
  async updateBag(
    @Args('Id') Id: number,
    @Args('updateBagtDto') updateBagtDto: UpdateBagtDto,
  ) {
    return await this.bagService.updateBag(Id, updateBagtDto);
  }

  @Mutation(() => Bag)
  async removeBag(@Args('Id') Id: number) {
    return await this.bagService.removeAirport(Id);
  }
}
