import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './entity/flightEntity';
import { Repository } from 'typeorm';
import { FlightDto } from './dto/flightDto';
import { FlightUpdateDto } from './dto/flightUpdateDto';
import { AirportService } from '../airport/airport.service';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    private readonly airportService: AirportService,
  ) {}

  async findAll(
    flightIds?: number[],
    filter?: {
      DepartureTime?: Date;
      DestinationAirport?: string;
      Airline?: string;
    },
    page = 1,
    take = 10,
  ) {
    const query = this.flightRepository
      .createQueryBuilder('Flight')
      .where('Flight.Number IN (:...flightIds)', { flightIds });

    const skip = (page - 1) * take;

    if (filter?.DepartureTime !== undefined) {
      query.andWhere('Flight.DepartureTime = :DepartureTime', {
        DepartureTime: filter.DepartureTime,
      });
    }

    if (filter?.DestinationAirport !== undefined) {
      query.andWhere('Flight.DestinationAirport = :DestinationAirport', {
        DestinationAirport: filter.DestinationAirport,
      });
    }

    if (filter?.Airline !== undefined) {
      query.andWhere('Flight.Airline = :Airline', {
        Airline: filter.Airline,
      });
    }

    query.take(take).skip(skip);

    const [flights, total] = await query.getManyAndCount();

    return {
      data: flights,
      total,
      page,
      take,
      totalPages: Math.ceil(total / take),
    };
  }

  async findOne(id: number) {
    return await this.flightRepository.findOne({
      where: { Number: id },
      relations: { airport: true, stuff: true, books: true },
    });
  }

  async create(id: number, flightDto: FlightDto, airportId: number) {
    if (!airportId) {
      throw new Error('not found');
    }
    const airport = await this.airportService.getAirport(airportId);

    if (!airport) {
      throw new Error('Airport not found');
    }

    if (!flightDto) {
      throw new Error('Flight data is required');
    }

    const flightExists = await this.flightRepository.findOne({
      where: { Number: id }, // Assuming Number is unique for this example; adjust as needed
    });
    if (flightExists) {
      throw new Error(`Flight already exists`);
    }

    const flight = this.flightRepository.create({
      ...flightDto,
      airport,
    });
    return this.flightRepository.save(flight);
  }

  async update(id: number, flightUpdateDto: FlightUpdateDto) {
    if (!flightUpdateDto || !id) {
      throw new Error('Flight data and ID are required');
    }
    const flight = await this.flightRepository.findOne({
      where: { Number: id },
    });
    if (!flight) {
      throw new Error(`Flight not found`);
    }
    return await this.flightRepository.update(id, flightUpdateDto);
  }

  async remove(id: number) {
    if (!id) {
      throw new Error('Flight ID is required');
    }
    const flight = await this.flightRepository.findOne({
      where: { Number: id },
      relations: { airport: true, stuff: true, books: true },
    });
    if (!flight) {
      throw new Error(`Flight with id ${id} not found`);
    }
    return this.flightRepository.remove(flight);
  }
}
