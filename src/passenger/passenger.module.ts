import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerResolver } from './passenger.resolver';
import { Passenger } from './entity/passengerEntity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PassengerResolver, PassengerService],
  imports: [TypeOrmModule.forFeature([Passenger])],
  exports: [PassengerService],
})
export class PassengerModule {}
