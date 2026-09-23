import { Module } from '@nestjs/common';
import { BagService } from './bag.service';
import { BagResolver } from './bag.resolver';
import { Bag } from './entities/bag.Entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengerModule } from '../passenger/passenger.module';

@Module({
  providers: [BagResolver, BagService],
  imports: [TypeOrmModule.forFeature([Bag]), PassengerModule],
})
export class BagModule {}
