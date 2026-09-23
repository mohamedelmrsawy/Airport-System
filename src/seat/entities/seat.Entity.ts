import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Flight } from '../../flight/entities/flight.Entity';
import { SeatStatus } from '../enms/seatEnum';

@Entity()
@ObjectType()
export class Seat {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id!: number;

  @Column()
  @Field()
  seatNumbber!: string;

  @Column({ type: 'enum', enum: SeatStatus, default: SeatStatus.AVAILABLE })
  @Field(() => SeatStatus)
  Status!: SeatStatus;

  @ManyToOne(() => Flight)
  @Field(() => Flight)
  flightId!: Flight;
}
