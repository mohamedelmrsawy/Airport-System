import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Airport } from './entity/airportEntity';
import { Repository } from 'typeorm';
import { UpdateAirportDto } from './Dto/updateAirportDto';
import { CreateAirportDto } from './Dto/createAirportDto';

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(Airport)
    private readonly airportReposatory: Repository<Airport>,
  ) {}

  async getAllAirport() {
    return await this.airportReposatory.find();
  }

  async getAirport(Id: number) {
    return await this.airportReposatory.findOne({ where: { Id } });
  }

  async updateAirport(Id: number, updateAirportDto: UpdateAirportDto) {
    const airportExists = await this.airportReposatory.findBy({ Id });

    if (airportExists) {
      throw new Error('Airport already exists');
    }

    if (!updateAirportDto) {
      throw new Error('Missing required fields');
    }
    const updateAirport = await this.airportReposatory.update(
      Id,
      updateAirportDto,
    );
    return updateAirport;
  }

  async createAirport(Id: number, createAirportDto: CreateAirportDto) {
    const airportExists = await this.airportReposatory.findOne({
      where: { Id },
    });

    if (airportExists) {
      throw new Error('Airport already exists');
    }

    if (!createAirportDto) {
      throw new Error('Missing required fields');
    }

    const newAirport = new Airport();
    newAirport.Name = createAirportDto.Name;
    newAirport.Country = createAirportDto.Country;
    return await this.airportReposatory.save(newAirport);
  }

  async removeAirport(Id: number) {
    const airportExists = await this.airportReposatory.findBy({ Id });

    if (!airportExists) {
      throw new Error('Passenger not exists');
    }
    return await this.airportReposatory.remove(airportExists);
  }
}
