import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput } from '../user/dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    return {
      user,
      authToken: this.jwtService.sign(
        {
          email: user.email,
          sub: user._id,
          name: user.name,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      ),
    };
  }

  async signup(payload: CreateUserInput) {
    const userExists = await this.userService.findOneByEmail(payload.email);
    if (userExists) {
      throw new Error('User already exists');
    }

    const saltRounds = Number(this.configService.get<string>('SALT_ROUNDS'));
    const hash = await bcrypt.hash(payload.password, saltRounds);
    const user = await this.userService.create({ ...payload, password: hash });
    return user;
  }
}
