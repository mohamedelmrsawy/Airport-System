import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stuff } from './entities/staff.Entity';
import { Repository } from 'typeorm';
import { FlightService } from '../flight/flight.service';
import { StuffDto } from './Dto/staffDto';
import { AuthService } from '../auth/auth.service';
import { jwtTypeStaff } from '../types/jwtTypeStaff';
import DataLoader from 'dataloader';

@Injectable()
export class StuffService {
  constructor(
    @InjectRepository(Stuff)
    private readonly stuffRepository: Repository<Stuff>,
    private readonly flightService: FlightService,
    private readonly authService: AuthService,
  ) {}

  async getAllStuff() {
    return await this.stuffRepository.find({ relations: { flight: true } });
  }

  async getStuffById(id: number) {
    return await this.stuffRepository.findOne({
      where: { EmployeeId: id },
      relations: { flight: true },
    });
  }

  async createStuff(Id: number, stuffDto: StuffDto, flightId: number = 0) {
    const existingStuff = await this.stuffRepository.findOne({
      where: { EmployeeId: Id },
    });

    if (existingStuff) {
      throw new Error('Stuff already exists');
    }

    if (!stuffDto) {
      throw new BadRequestException();
    }
    const newStuff = new Stuff();
    newStuff.Name = stuffDto.Name;
    newStuff.Role = stuffDto.Role;
    newStuff.AssignedFlight = stuffDto.AssignedFlight;

    if (flightId !== 0) {
      const flight = await this.flightService.findOne(flightId);

      if (flight !== null) {
        newStuff.flight = flight;
      }
    }

    return await this.stuffRepository.save(newStuff);
  }

  async updateStuff(id: number, stuffDto: StuffDto) {
    if (!stuffDto || !id) {
      throw new BadRequestException();
    }
    const existingStuff = await this.stuffRepository.findOne({
      where: { EmployeeId: id },
    });
    if (!existingStuff) {
      throw new NotFoundException();
    }
    await this.stuffRepository.update(id, stuffDto);

    return existingStuff;
  }

  async deleteStuff(id: number) {
    const existingStuff = await this.stuffRepository.findOne({
      where: { EmployeeId: id },
    });
    if (!existingStuff) {
      throw new NotFoundException();
    }
    return await this.stuffRepository.remove(existingStuff);
  }

  async stuffLogin(stuffJwt: jwtTypeStaff) {
    return await this.authService.stuffLogin(stuffJwt);
  }

  stuffDataLoader() {
    return new DataLoader<number, Stuff[]>(async (flightids) => {
      const allStuff = await this.stuffRepository
        .createQueryBuilder('stuff')
        .where('stuff.flightId IN (:...flightids)', { flightids })
        .getMany();

      const grouped = new Map<number, Stuff[]>();

      for (const stuff of allStuff) {
        if (!grouped.has(stuff.flightId)) {
          grouped.set(stuff.flightId, []);
        }
        grouped.get(stuff.flightId)!.push(stuff);
      }

      return flightids.map((Ids) => grouped.get(Ids) ?? []);
    });
  }
}
