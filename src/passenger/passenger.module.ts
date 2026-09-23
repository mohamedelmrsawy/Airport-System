import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerResolver } from './passenger.resolver';
import { Passenger } from './entities/passenger.Entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StuffModule } from '../staff/staff.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [PassengerResolver, PassengerService],
  imports: [TypeOrmModule.forFeature([Passenger]), StuffModule, JwtModule],
  exports: [PassengerService],
})
export class PassengerModule {}
