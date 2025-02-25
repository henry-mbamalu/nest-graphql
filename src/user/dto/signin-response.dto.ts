import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignInResponse {
  @Field()
  accessToken: string;

  @Field()
  username: string;
}
