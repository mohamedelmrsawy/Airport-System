import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stuff } from './entity/stuffEntity';
import { Repository } from 'typeorm';
import { FlightService } from '../flight/flight.service';
import { StuffDto } from './Dto/stuffDto';
import { AuthService } from '../auth/auth.service';
import { StuffJwtType } from '../types/stuffJwtType';

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

  async createStuff(Id: number, stuffDto: StuffDto, flightId: number) {
    if (!flightId) {
      throw new Error('not found');
    }

    const flight = await this.flightService.findOne(flightId);

    if (!flight) {
      throw new Error('Flight not found');
    }

    const existingStuff = await this.stuffRepository.findOne({
      where: { EmployeeId: Id },
    });

    if (existingStuff) {
      throw new Error('Stuff already exists');
    }

    if (!stuffDto) {
      throw new Error('StuffDto is null or undefined');
    }
    const newStuff = this.stuffRepository.create({
      ...stuffDto,
      flight,
    });
    return await this.stuffRepository.save(newStuff);
  }

  async updateStuff(id: number, stuffDto: StuffDto) {
    if (!stuffDto || !id) {
      throw new Error('StuffDto and ID are required');
    }
    const existingStuff = await this.stuffRepository.findOne({
      where: { EmployeeId: id },
    });
    if (!existingStuff) {
      throw new Error(`Stuff with ID ${id} not found`);
    }
    return await this.stuffRepository.update(id, stuffDto);
  }

  async deleteStuff(id: number) {
    const existingStuff = await this.stuffRepository.findOne({
      where: { EmployeeId: id },
    });
    if (!existingStuff) {
      throw new Error(`Stuff with ID ${id} not found`);
    }
    return await this.stuffRepository.remove(existingStuff);
  }

  async stuffLogin(stuffJwt: StuffJwtType) {
    return await this.authService.stuffLogin(stuffJwt);
  }
}
