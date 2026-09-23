import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StuffJwtType {
  @Field()
  name!: string;
  @Field()
  role!: string;
}
