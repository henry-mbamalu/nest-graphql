import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { SignUpInput } from './dto/signup.dto';
import { SignInInput } from './dto/signin.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<User> {
    const { username, password } = signUpInput;

    if(!username.trim().length || !password.trim().length) throw  new BadRequestException("Invalid request");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new ConflictException('Email already exists');
    }
  }

  async signIn(signInInput: SignInInput): Promise<{ accessToken: string, username: string }> {
    const { username, password } = signInInput;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken , username: user.username};
  }
}
