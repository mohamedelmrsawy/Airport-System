import { Module, forwardRef } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { Book } from './entity/bookEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightModule } from '../flight/flight.module';
import { PassengerModule } from '../passenger/passenger.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  providers: [BookResolver, BookService],
  imports: [
    TypeOrmModule.forFeature([Book]),
    FlightModule,
    forwardRef(() => PassengerModule),
    MailerModule,
  ],
})
export class BookModule {}
