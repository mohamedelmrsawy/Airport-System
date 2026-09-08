import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Passenger } from '../../passenger/entity/passengerEntity';
import { Flight } from '../../flight/entity/flightEntity';

@Entity()
@ObjectType()
export class Book {
  @PrimaryColumn()
  @Field()
  SeatNumber!: string;

  //@PrimaryColumn()
  @ManyToOne(() => Passenger, (passenger) => passenger.books)
  @Field(() => Passenger)
  passenger!: Passenger;

  //@PrimaryColumn()
  @ManyToOne(() => Flight, (flight) => flight.books)
  @Field(() => Flight)
  flight!: Flight;
}
