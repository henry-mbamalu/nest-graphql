import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  @MinLength(6)
  password: string;
}
