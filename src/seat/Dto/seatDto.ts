import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { SeatStatus } from '../enms/seatEnum';

@InputType()
export class SeatDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  seatNumbber!: string;

  @IsNotEmpty()
  @Field(() => SeatStatus)
  Status!: SeatStatus;
}
