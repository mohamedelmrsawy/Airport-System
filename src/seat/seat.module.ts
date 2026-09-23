import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatResolver } from './seat.resolver';
import { FlightModule } from '../flight/flight.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.Entity';
import { StuffModule } from '../staff/staff.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [SeatResolver, SeatService],
  imports: [
    TypeOrmModule.forFeature([Seat]),
    FlightModule,
    StuffModule,
    JwtModule,
  ],
  exports: [SeatService],
})
export class SeatModule {}
