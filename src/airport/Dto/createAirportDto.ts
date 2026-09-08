import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAirportDto {
  @Field()
  Name!: string;

  @Field()
  Country!: string;
}
