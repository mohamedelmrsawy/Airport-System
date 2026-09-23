import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Passenger } from '../../passenger/entities/passenger.Entity';
import { BagStatus } from '../statusBagsEnum/bagStatus';
import { IsEnum, IsNumber, IsString } from 'class-validator';

@Entity()
@ObjectType()
export class Bag {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  @IsNumber()
  Id!: number;

  @Column()
  @Field()
  @IsString()
  color!: string;

  @Column()
  @Field()
  @IsString()
  baggageTag!: string;

  @Column()
  @Field(() => Int)
  @IsNumber()
  weight!: number;

  @Column('enum', { enum: BagStatus })
  @Field(() => BagStatus)
  @IsEnum(BagStatus)
  status!: BagStatus;

  @ManyToOne(() => Passenger, (Passenger) => Passenger.bags)
  @Field(() => Passenger)
  passenger!: Passenger;
}
