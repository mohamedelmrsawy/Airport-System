import { Module } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportResolver } from './airport.resolver';
import { Airport } from './entities/airport.Entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AirportResolver, AirportService],
  imports: [TypeOrmModule.forFeature([Airport])],
  exports: [AirportService],
})
export class AirportModule {}
