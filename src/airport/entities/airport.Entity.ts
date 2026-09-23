import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Flight } from '../../flight/entities/flight.Entity';

@Entity()
@ObjectType()
export class Airport {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id!: number;

  @Column()
  @Field()
  Name!: string;

  @Column()
  @Field()
  Country!: string;

  @OneToMany(() => Flight, (Flight) => Flight.departureAirport)
  @Field(() => [Flight])
  departureAirport!: Flight[];

  @OneToMany(() => Flight, (Flight) => Flight.destinationAirport)
  @Field(() => [Flight])
  destinationAirport!: Flight[];
}
