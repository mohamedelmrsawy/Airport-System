import { InputType, Field, Int } from '@nestjs/graphql';
import { BagStatus } from '../statusBagsEnum/bagStatus';
import { IsEnum, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateBagtDto {
  @Field()
  @IsString()
  color!: string;

  @Field()
  @IsString()
  baggageTag!: string;

  @Field(() => Int)
  @IsNumber()
  weight!: number;

  @Field(() => BagStatus)
  @IsEnum(BagStatus)
  status!: BagStatus;
}
