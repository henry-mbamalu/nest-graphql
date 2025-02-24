import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { SignUpInput } from './dto/signup.dto';
import { SignInInput } from './dto/signin.dto';
import { SignInResponse } from './dto/signin-response.dto';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.userService.signUp(signUpInput);
  }

  @Mutation(() => SignInResponse)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.userService.signIn(signInInput);
  }
}
