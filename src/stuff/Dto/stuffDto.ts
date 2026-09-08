import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { StuffEnum } from '../stuffEnum/stuffEnum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StuffDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  Name!: string;

  @IsNotEmpty()
  @IsEnum(StuffEnum)
  @Field(() => StuffEnum)
  Role!: StuffEnum;

  @IsNotEmpty()
  @IsString()
  @Field()
  AssignedFlight!: string;
}
