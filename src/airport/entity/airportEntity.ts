import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Flight } from '../../flight/entity/flightEntity';

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

  @OneToMany(() => Flight, (Flight) => Flight.airport)
  @Field(() => [Flight])
  flight!: Flight[];
}
