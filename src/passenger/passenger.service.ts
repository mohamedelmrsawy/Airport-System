import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.Entity';
import { Repository } from 'typeorm';
import { PassengerDto } from './Dto/passengerDto';

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,
  ) {}

  async registerPassenger(passengerDto: PassengerDto) {
    const passengerExists = await this.passengerRepository.findOne({
      where: {
        Name: passengerDto.Name,
        passportNumber: passengerDto.passportNumber,
        nationality: passengerDto.Nationality,
      },
    });

    if (passengerExists) {
      throw new Error('Passenger already exists');
    }

    if (!passengerDto) {
      throw new BadRequestException();
    }

    const passenger = new Passenger();
    passenger.Name = passengerDto.Name;
    passenger.email = passengerDto.email;
    passenger.passportNumber = passengerDto.passportNumber;
    passenger.nationality = passengerDto.Nationality;
    return await this.passengerRepository.save(passenger);
  }

  async findPassengerById(id: number) {
    const passenger = await this.passengerRepository.findOne({
      where: { Id: id },
      relations: { books: true, bags: true },
    });
    return passenger;
  }

  async getAllPassenger() {
    const passengers = await this.passengerRepository
      .createQueryBuilder('passenger')
      .getMany();

    return passengers;
  }
}
