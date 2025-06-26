import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { LoginUserInput } from '../user/dto/user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserInput: LoginUserInput): Promise<User> {
    return this.userService.validateUser(loginUserInput);
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async verifyToken(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token);
    return this.userService.findByEmail(decoded.email);
  }
}
