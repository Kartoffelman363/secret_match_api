import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Result, UsersService } from './users.service';
import { LoginUsrBody, RegUsrBody } from './user.model';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async postRegister(@Body() regUsrBody: RegUsrBody): Promise<Result> {
    return await this.usersService.register(regUsrBody);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  postLogin(@Body() loginUsrBody: LoginUsrBody): Result {
    return this.authService.login();
  }
}
