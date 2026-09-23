import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class PassengerDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  Name!: string;

  @IsString()
  @Field()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  passportNumber!: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  Nationality!: string;
}
