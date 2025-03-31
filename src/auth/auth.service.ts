import { Injectable } from '@nestjs/common';
import { Result, UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Result> {
    const findUsrRes = await this.usersService.findOneByEmail(email);
    if (!findUsrRes.success) {
      return findUsrRes;
    }
    const usr = findUsrRes.extra as User;
    if (await compare(password, usr.password)) {
      return { success: true };
    }
    return { success: false, extra: 'Invalid password' };
  }

  login(usr: User): string {
    return this.jwtService.sign({ username: usr.email, id: usr.id });
  }
}
