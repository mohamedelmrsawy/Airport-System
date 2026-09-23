import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateBookingDto {
  @Field()
  @IsString()
  seatNumber!: string;

  @Field(() => Int)
  @IsNumber()
  passengerId!: number;

  @Field(() => Int)
  @IsNumber()
  flightId!: number;

  @Field(() => Int)
  @IsNumber()
  seatId!: number;
}
