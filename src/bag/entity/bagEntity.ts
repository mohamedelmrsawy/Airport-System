import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Passenger } from '../../passenger/entity/passengerEntity';
import { BagStatus } from '../statusBagsEnum/bagStatus';

@Entity()
@ObjectType()
export class Bag {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id!: number;

  @Column()
  @Field()
  color!: string;

  @Column()
  @Field()
  baggageTag!: string;

  @Column()
  @Field(() => Int)
  weight!: number;

  @Column('enum', { enum: BagStatus })
  @Field(() => BagStatus)
  stuts!: BagStatus;

  @ManyToOne(() => Passenger, (Passenger) => Passenger.bags)
  @Field(() => Passenger)
  passenger!: Passenger;
}
