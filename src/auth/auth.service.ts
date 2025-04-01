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
    const user = await this.usersService.findOneByEmail(email);
    if (!(await compare(password, user.password))) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }

  async validateAdmin(email: string): Promise<void> {
    const user = await this.usersService.findAdminByEmail(email);
    if (!user.admin.active) {
      throw new UnauthorizedException();
    }
  }
}
