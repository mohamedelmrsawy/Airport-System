import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bag } from './entities/bag.Entity';
import { Repository } from 'typeorm';
import { UpdateBagtDto } from './Dto/updateBagDto';
import { PassengerService } from '../passenger/passenger.service';

@Injectable()
export class BagService {
  constructor(
    @InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
    private readonly passengerService: PassengerService,
  ) {}

  async getAllBag() {
    return await this.bagRepository.find();
  }

  async getBag(Id: number) {
    return await this.bagRepository.findOne({ where: { Id } });
  }

  async updateBag(Id: number, updateBagtDto: UpdateBagtDto) {
    const bagExists = await this.bagRepository.findOne({ where: { Id } });

    if (!bagExists) {
      throw new Error('Bag not exists');
    }

    if (!updateBagtDto) {
      console.log('not bag');
      throw BadRequestException;
    }
    await this.bagRepository.update(Id, updateBagtDto);
    return bagExists;
  }

  async createBag(
    Id: number,
    passengerId: number,
    updateBagtDto: UpdateBagtDto,
  ) {
    const passenger =
      await this.passengerService.findPassengerById(passengerId);

    if (!passenger) {
      throw NotFoundException;
    }

    const bagExists = await this.bagRepository.findOne({ where: { Id } });

    if (bagExists) {
      throw new Error('Bag already exists');
    }
    if (!updateBagtDto) {
      console.log('baaaaaag');
      throw BadRequestException;
    }

    const newBag = new Bag();
    newBag.color = updateBagtDto.color;
    newBag.baggageTag = updateBagtDto.baggageTag;
    newBag.weight = updateBagtDto.weight;
    newBag.status = updateBagtDto.status;
    newBag.passenger = passenger;
    return await this.bagRepository.save(newBag);
  }

  async removeAirport(Id: number) {
    const bagExists = await this.bagRepository.findOne({ where: { Id } });

    if (!bagExists) {
      throw NotFoundException;
    }
    return await this.bagRepository.remove(bagExists);
  }
}
