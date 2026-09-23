import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Bag } from '../../bag/entities/bag.Entity';
import { Book } from '../../book/entities/book.Entity';

@Entity()
@ObjectType()
export class Passenger {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id!: number;

  @Column()
  @Field()
  Name!: string;

  @Column({ nullable: true })
  @Field()
  email!: string;

  @Column()
  @Field()
  passportNumber!: string;

  @Column()
  @Field()
  nationality!: string;

  @OneToMany(() => Bag, (Bag) => Bag.passenger)
  @Field(() => [Bag])
  bags!: Bag[];

  @OneToMany(() => Book, (Book) => Book.passenger)
  @Field(() => [Book])
  books!: Book[];
}
