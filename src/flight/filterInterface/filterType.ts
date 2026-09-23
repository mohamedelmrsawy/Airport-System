import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';

@InputType()
export class FlightFilter {
  @Field(() => Date)
  @IsOptional()
  @IsDate()
  DepartureTime?: Date;

  @Field()
  @IsOptional()
  @IsString()
  DestinationAirport?: string;

  @Field()
  @IsOptional()
  @IsString()
  Airline?: string;
}
