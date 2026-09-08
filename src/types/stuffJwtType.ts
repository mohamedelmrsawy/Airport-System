import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StuffJwtType {
  @Field()
  Name!: string;
  @Field()
  role!: string;
}
