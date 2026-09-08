import { Module, forwardRef } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightResolver } from './flight.resolver';
import { Flight } from './entity/flightEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StuffModule } from '../stuff/stuff.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AirportModule } from '../airport/airport.module';

@Module({
  providers: [FlightResolver, FlightService],
  imports: [
    TypeOrmModule.forFeature([Flight]),
    forwardRef(() => StuffModule),
    AuthModule,
    JwtModule,
    AirportModule,
  ],
  exports: [FlightService],
})
export class FlightModule {}
