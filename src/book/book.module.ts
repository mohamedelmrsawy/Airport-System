import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { Book } from './entities/book.Entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightModule } from '../flight/flight.module';
import { PassengerModule } from '../passenger/passenger.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SeatModule } from '../seat/seat.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  providers: [BookResolver, BookService],
  imports: [
    TypeOrmModule.forFeature([Book]),
    FlightModule,
    PassengerModule,
    MailerModule,
    SeatModule,
    BullModule.registerQueue({ name: 'sendEmail' }),
  ],
})
export class BookModule {}
