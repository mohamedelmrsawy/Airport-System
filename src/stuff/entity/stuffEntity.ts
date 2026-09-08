import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Flight } from '../../flight/entity/flightEntity';
import { StuffEnum } from '../stuffEnum/stuffEnum';

@Entity()
@ObjectType()
export class Stuff {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  EmployeeId!: number;

  @Column()
  @Field()
  Name!: string;

  @Column({ type: 'enum', enum: StuffEnum })
  @Field(() => StuffEnum)
  Role!: StuffEnum;

  @Column()
  @Field()
  AssignedFlight!: string;

  @ManyToOne(() => Flight, (Flight) => Flight.stuff)
  @Field(() => Flight)
  flight!: Flight;
}
