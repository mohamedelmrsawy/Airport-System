import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './entities/seat.Entity';
import { Repository } from 'typeorm';
import { SeatDto } from './Dto/seatDto';
import { FlightService } from '../flight/flight.service';
import { SeatStatus } from './enms/seatEnum';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat) private readonly seatReposatory: Repository<Seat>,
    private readonly flightService: FlightService,
  ) {}

  async getAllSeat() {
    return await this.seatReposatory.find();
  }

  async getSeat(Id: number) {
    return await this.seatReposatory.findOne({ where: { Id } });
  }

  async updateSeat(Id: number, seatDto: SeatDto) {
    const seatExists = await this.seatReposatory.findOne({ where: { Id } });

    if (!seatExists) {
      throw new NotFoundException();
    }

    if (!seatDto) {
      throw new BadRequestException();
    }
    await this.seatReposatory.update(Id, seatDto);

    return seatExists;
  }

  async createBag(Id: number, seatDto: SeatDto, FlightId: number) {
    const flight = await this.flightService.findOne(FlightId);

    if (!flight) {
      throw new NotFoundException();
    }

    const SeatExists = await this.seatReposatory.findOne({ where: { Id } });

    if (SeatExists?.Status == SeatStatus.AVAILABLE) {
      throw new Error('Seat already exists');
    }
    if (!seatDto) {
      throw new BadRequestException();
    }

    const newSeat = new Seat();
    newSeat.seatNumbber = seatDto.seatNumbber;
    newSeat.Status = seatDto.Status;
    newSeat.flightId = flight;

    return await this.seatReposatory.save(newSeat);
  }

  async removeAirport(Id: number) {
    const SeatExists = await this.seatReposatory.findOne({ where: { Id } });

    if (!SeatExists) {
      throw new NotFoundException();
    }
    return await this.seatReposatory.remove(SeatExists);
  }
}
