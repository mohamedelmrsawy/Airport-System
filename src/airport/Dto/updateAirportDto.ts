import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAirportDto {
  @Field()
  Name!: string;

  @Field()
  Country!: string;
}
