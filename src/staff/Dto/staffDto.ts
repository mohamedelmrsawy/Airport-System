import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { StuffEnum } from '../staffEnum/staffEnum';
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

  @IsString()
  @Field({ nullable: true })
  AssignedFlight!: string;
}
