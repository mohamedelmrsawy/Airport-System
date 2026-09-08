import { InputType, Field, Int } from '@nestjs/graphql';
import { BagStatus } from '../statusBagsEnum/bagStatus';

@InputType()
export class UpdateBagtDto {
  @Field()
  color!: string;

  @Field()
  baggageTag!: string;

  @Field(() => Int)
  weight!: number;

  @Field(() => BagStatus)
  stuts!: BagStatus;
}
