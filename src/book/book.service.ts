import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.Entity';
import { Repository } from 'typeorm';
import { FlightService } from '../flight/flight.service';
import { PassengerService } from '../passenger/passenger.service';
import { DataSource } from 'typeorm';
import { Passenger } from '../passenger/entities/passenger.Entity';
import { Flight } from '../flight/entities/flight.Entity';
import { MailerService } from '@nestjs-modules/mailer';
import { FlightStatus } from '../flight/enms/flightStatus';
import { CreateBookingDto } from './Dto/craeteBookingDto';
import { Seat } from '../seat/entities/seat.Entity';
import { SeatStatus } from '../seat/enms/seatEnum';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectQueue('sendEmail') private readonly emailQueue: Queue,
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
    private readonly dataSource: DataSource,
    private readonly mailerService: MailerService,
  ) {}

  async createBook(creatbookingdto: CreateBookingDto) {
    const querystart = this.dataSource.createQueryRunner();
    await querystart.connect();
    await querystart.startTransaction();

    try {
      const passenger = await querystart.manager.findOne(Passenger, {
        where: { Id: creatbookingdto.passengerId },
      });

      if (!passenger) {
        throw NotFoundException;
      }

      const flight = await querystart.manager.findOne(Flight, {
        where: { Id: creatbookingdto.flightId },
      });

      //const flight = await querystart.manager
      //.createQueryBuilder(Flight, 'flight')
      //.setLock('pessimistic_write')
      //.where('flight.Id = :flightId', { flightId })
      //.getOne();

      if (!flight) {
        throw NotFoundException;
      }

      const seat = await querystart.manager
        .createQueryBuilder(Seat, 'Seat')
        .setLock('pessimistic_write')
        .where('Seat.Id = :seatId ', { seatId: creatbookingdto.seatId })
        .getOne();

      if (!seat) {
        throw new NotFoundException();
      }

      if (flight.AvailableSeats <= 0) {
        throw new BadRequestException();
      }

      if (
        flight.Status == FlightStatus.CANCELED ||
        flight.Status == FlightStatus.DELAYED
      ) {
        throw new Error('flight is not available');
      }

      if (flight.Status == FlightStatus.LEAVE) {
        throw new Error('The flight has already departed');
      }

      const bookExists = await querystart.manager.findOne(Book, {
        where: {
          SeatNumber: creatbookingdto.seatNumber,
          flightId: creatbookingdto.flightId,
          seatId: creatbookingdto.seatId,
        },
      });

      if (bookExists) {
        throw new ConflictException('Book already exists');
      }

      const newBooking = new Book();
      newBooking.SeatNumber = creatbookingdto.seatNumber;
      newBooking.flight = flight;
      newBooking.passenger = passenger;
      newBooking.seat = seat;
      newBooking.flightId = creatbookingdto.flightId;
      newBooking.passengerId = creatbookingdto.passengerId;
      newBooking.seatId = creatbookingdto.seatId;

      flight.AvailableSeats -= 1;
      seat.Status = SeatStatus.UNAVAILABLE;

      await querystart.manager.save(seat);
      await querystart.manager.save(flight);
      await querystart.manager.save(newBooking);

      await this.emailQueue.add('email', {
        SeatNumber: newBooking.SeatNumber,
        passenger: passenger,
      });

      await querystart.commitTransaction();

      return newBooking;
    } catch (error) {
      await querystart.rollbackTransaction();
      throw error;
    }
  }
}
