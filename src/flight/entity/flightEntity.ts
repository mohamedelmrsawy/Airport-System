import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { FlightStatus } from '../enms/flightStatus';
import { Airport } from '../../airport/entity/airportEntity';
import { Stuff } from '../../stuff/entity/stuffEntity';
import { Book } from '../../book/entity/bookEntity';
registerEnumType(FlightStatus, { name: 'FlightStatus' });
@Entity()
@ObjectType()
export class Flight {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Number!: number;

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

  @ManyToOne(() => Airport, (Airport) => Airport.Id)
  @Field(() => Airport)
  airport!: Airport;

  @OneToMany(() => Stuff, (Stuff) => Stuff.Name)
  @Field(() => [Stuff])
  stuff!: Stuff[];

  @OneToMany(() => Book, (book) => book.flight)
  @Field(() => [Book])
  books!: Book[];
}
