import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bag } from './entity/bagEntity';
import { Repository } from 'typeorm';
import { UpdateBagtDto } from './Dto/updateBagDto';
import { PassengerService } from '../passenger/passenger.service';

@Injectable()
export class BagService {
  constructor(
    @InjectRepository(Bag) private readonly bagReposatory: Repository<Bag>,
    private readonly passengerService: PassengerService,
  ) {}

  async getAllBag() {
    return await this.bagReposatory.find();
  }

  async getBag(Id: number) {
    return await this.bagReposatory.findOne({ where: { Id } });
  }

  async updateBag(Id: number, updateBagtDto: UpdateBagtDto) {
    const bagExists = await this.bagReposatory.findBy({ Id });

    if (bagExists) {
      throw new Error('Bag already exists');
    }

    if (!updateBagtDto) {
      throw new Error('Missing required fields');
    }
    const updateBag = await this.bagReposatory.update(Id, updateBagtDto);
    return updateBag;
  }

  async createBag(
    Id: number,
    updateBagtDto: UpdateBagtDto,
    passengerId: number,
  ) {
    const passenger =
      await this.passengerService.findPassengerById(passengerId);

    if (!passenger) {
      throw new Error('Passenger not found');
    }

    const bagExists = await this.bagReposatory.findOne({ where: { Id } });

    if (bagExists) {
      throw new Error('Bag already exists');
    }
    if (!updateBagtDto) {
      throw new Error('Missing required fields');
    }

    const newBag = new Bag();
    newBag.color = updateBagtDto.color;
    newBag.baggageTag = updateBagtDto.baggageTag;
    newBag.weight = updateBagtDto.weight;
    newBag.stuts = updateBagtDto.stuts;
    newBag.passenger = passenger;
    return await this.bagReposatory.save(newBag);
  }

  async removeAirport(Id: number) {
    const bagExists = await this.bagReposatory.findBy({ Id });

    if (!bagExists) {
      throw new Error('Bag not exists');
    }
    return await this.bagReposatory.remove(bagExists);
  }
}
