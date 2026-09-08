import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entity/bookEntity';
import { Repository } from 'typeorm';
import { FlightService } from '../flight/flight.service';
import { PassengerService } from '../passenger/passenger.service';
import { DataSource } from 'typeorm';
import { Passenger } from '../passenger/entity/passengerEntity';
import { Flight } from '../flight/entity/flightEntity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
    private readonly dataSource: DataSource,
    private readonly mailerService: MailerService,
  ) {}

  async createBook(seatNumber: string, passengerId: number, flightId: number) {
    const querystart = this.dataSource.createQueryRunner();
    await querystart.connect();
    await querystart.startTransaction();

    try {
      const passenger = await querystart.manager.findOne(Passenger, {
        where: { Id: passengerId },
      });

      if (!passenger) {
        throw new Error('Passenger not found');
      }

      const flight = await querystart.manager
        .createQueryBuilder(Flight, 'flight')
        .setLock('pessimistic_write')
        .where('flight.Number = :flightId', { flightId })
        .getOne();

      if (!flight) {
        throw new Error('Flight not found');
      }

      if (flight.AvailableSeats <= 0) {
        throw new Error('No seats available on this flight');
      }

      const bookExists = await querystart.manager.findOne(Book, {
        where: {
          SeatNumber: seatNumber,
          passenger: { Id: passengerId },
          flight: { Number: flightId },
        },
      });

      if (bookExists) {
        throw new Error('Book already exists');
      }

      const newBooking = new Book();
      newBooking.SeatNumber = seatNumber;
      newBooking.passenger = passenger;
      newBooking.flight = flight;

      flight.AvailableSeats -= 1;
      await querystart.manager.save(flight);
      await querystart.manager.save(newBooking);
      await querystart.commitTransaction();

      try {
        await this.mailerService.sendMail({
          from: 'mohamed@gmail.com',
          to: 'ali@gmail.com',
          subject: 'login success',
          text: `${newBooking.flight.AvailableSeats}`,
        });
      } catch (error) {
        console.log(error);
      }

      return newBooking;
    } catch (error) {
      await querystart.rollbackTransaction();
      throw error;
    }
  }
}
