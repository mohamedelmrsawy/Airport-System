import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './entities/flight.Entity';
import { Repository } from 'typeorm';
import { FlightDto } from './dto/flightDto';
import { FlightUpdateDto } from './dto/flightUpdateDto';
import { AirportService } from '../airport/airport.service';
import { FlightFilter } from './filterInterface/filterType';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    private readonly airportService: AirportService,
  ) {}

  async findAll(
    flightIds?: number[],
    filter?: FlightFilter,
    page = 1,
    take = 10,
  ) {
    const query = this.flightRepository.createQueryBuilder('flight');

    if (flightIds?.length) {
      query.where('flight.Id IN (:...flightIds)', { flightIds });
    }

    const skip = (page - 1) * take;

    if (filter) {
      if (filter?.DepartureTime !== undefined) {
        query.andWhere('flight.DepartureTime = :DepartureTime', {
          DepartureTime: filter.DepartureTime,
        });
      }

      if (filter?.DestinationAirport !== undefined) {
        query.andWhere('flight.DestinationAirport = :DestinationAirport', {
          DestinationAirport: filter.DestinationAirport,
        });
      }

      if (filter?.Airline !== undefined) {
        query.andWhere('flight.Airline = :Airline', {
          Airline: filter.Airline,
        });
      }
    }

    query.take(take).skip(skip);

    const flights = await query.getMany();

    return flights;
  }

  async findOne(id: number) {
    return await this.flightRepository.findOne({
      where: { Id: id },
      relations: { stuff: true, books: true, seats: true },
    });
  }

  async create(id: number, flightDto: FlightDto, airportId: number) {
    if (!airportId) {
      console.log('fliiiiiiiii');
      throw new BadRequestException();
    }
    const airport = await this.airportService.getAirport(airportId);

    if (!airport) {
      console.log('fliiiiiiiii');
      throw new NotFoundException();
    }

    if (!flightDto) {
      console.log('fliiiiiiiii');
      throw new BadRequestException();
    }

    const flightExists = await this.flightRepository.findOne({
      where: { Id: id }, // Assuming Number is unique for this example; adjust as needed
    });
    if (flightExists) {
      console.log('fliiiiiiiii');
      throw new Error(`Flight already exists`);
    }

    const flight = this.flightRepository.create({
      ...flightDto,
      departureAirport: airport,
      destinationAirport: airport,
    });
    return this.flightRepository.save(flight);
  }

  async update(id: number, flightUpdateDto: FlightUpdateDto) {
    if (!flightUpdateDto || !id) {
      throw new BadRequestException();
    }
    const flight = await this.flightRepository.findOne({
      where: { Id: id },
    });
    if (!flight) {
      throw new NotFoundException();
    }
    await this.flightRepository.update(id, flightUpdateDto);

    return flight;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException();
    }
    const flight = await this.flightRepository.findOne({
      where: { Id: id },
      relations: { stuff: true, books: true, seats: true },
    });
    if (!flight) {
      throw new NotFoundException();
    }
    return this.flightRepository.remove(flight);
  }
}
