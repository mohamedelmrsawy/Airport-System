import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Passenger } from '../../passenger/entities/passenger.Entity';
import { Flight } from '../../flight/entities/flight.Entity';
import { Seat } from '../../seat/entities/seat.Entity';

@Entity()
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id!: number;

  @Column({ unique: true, type: String })
  @Field(() => String)
  SeatNumber!: string;

  @Column({ unique: true })
  @Field(() => Int)
  flightId!: number;

  @Column({ unique: true })
  @Field(() => Int)
  passengerId!: number;

  @Column()
  @Field(() => Int)
  seatId!: number;

  //@PrimaryColumn()
  @ManyToOne(() => Passenger, (passenger) => passenger.books)
  @Field(() => Passenger)
  passenger!: Passenger;

  //@PrimaryColumn()
  @ManyToOne(() => Flight, (flight) => flight.books)
  @Field(() => Flight)
  flight!: Flight;

  @OneToOne(() => Seat)
  @JoinColumn()
  @Field(() => Seat)
  seat!: Seat;
}
