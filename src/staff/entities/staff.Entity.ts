import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Flight } from '../../flight/entities/flight.Entity';
import { StuffEnum } from '../staffEnum/staffEnum';

@Entity()
@ObjectType()
export class Stuff {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  EmployeeId!: number;

  @Column()
  @Field()
  Name!: string;

  @Column()
  @Field(() => Int)
  flightId!: number;

  @Column({ type: 'enum', enum: StuffEnum })
  @Field(() => StuffEnum)
  Role!: StuffEnum;

  @Column({ nullable: true })
  @Field()
  AssignedFlight!: string;

  @ManyToOne(() => Flight, (Flight) => Flight.stuff)
  @Field(() => Flight)
  flight!: Flight;
}
