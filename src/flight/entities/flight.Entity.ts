import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { FlightStatus } from '../enms/flightStatus';
import { Airport } from '../../airport/entities/airport.Entity';
import { Stuff } from '../../staff/entities/staff.Entity';
import { Book } from '../../book/entities/book.Entity';
import { Seat } from '../../seat/entities/seat.Entity';

registerEnumType(FlightStatus, { name: 'FlightStatus' });

@Entity()
@ObjectType()
export class Flight {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id!: number;

  @Column()
  @Field(() => Int)
  flightNumber!: number;

  @Column()
  @Field()
  DepartureAirport!: string;

  @Column()
  @Field()
  DestinationAirport!: string;

  @Column()
  @Field(() => Date)
  DepartureTime!: Date;

  @Column()
  @Field(() => Date)
  ArrivalTime!: Date;

  @Column()
  @Field()
  Airline!: string;

  @Column()
  @Field(() => Int)
  AvailableSeats!: number;

  @Column({ type: 'enum', enum: FlightStatus, default: FlightStatus.ONTIME })
  @Field(() => FlightStatus)
  Status!: FlightStatus;

  @ManyToOne(() => Airport)
  @Field(() => Airport)
  departureAirport!: Airport;

  @ManyToOne(() => Airport)
  @Field(() => Airport)
  destinationAirport!: Airport;

  @OneToMany(() => Stuff, (Stuff) => Stuff.Name)
  @Field(() => [Stuff])
  stuff!: Stuff[];

  @OneToMany(() => Book, (book) => book.flight)
  @Field(() => [Book])
  books!: Book[];

  @OneToMany(() => Seat, (seat) => seat.flightId)
  @Field(() => [Seat])
  seats!: Seat[];
}
