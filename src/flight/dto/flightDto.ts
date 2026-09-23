import { Field, InputType, Int } from '@nestjs/graphql';
import { FlightStatus } from '../enms/flightStatus';
import { IsDate, IsString, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class FlightDto {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  flightNumber!: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  DepartureAirport!: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  DestinationAirport!: string;

  @IsDate()
  @IsNotEmpty()
  @Field(() => Date)
  DepartureTime!: Date;

  @IsDate()
  @IsNotEmpty()
  @Field(() => Date)
  ArrivalTime!: Date;

  @IsString()
  @IsNotEmpty()
  @Field()
  Airline!: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  AvailableSeats!: number;

  @IsString()
  @IsNotEmpty()
  @Field(() => FlightStatus)
  Status!: FlightStatus;
}
