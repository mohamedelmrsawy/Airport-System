import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class jwtTypeStaff {
  @Field()
  @IsString()
  @IsNotEmpty()
  Name!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  Role!: string;
}
