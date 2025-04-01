import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const usr = await this.usersService.findOneByEmail(email);
    if (!(await compare(password, usr.password))) {
      throw new BadRequestException('Invalid password');
    }
    return usr;
  }

  async validateAdmin(email: string): Promise<void> {
    const usr = await this.usersService.findAdminByEmail(email);
    if (!usr.admin.active) {
      throw new UnauthorizedException();
    }
  }
}
