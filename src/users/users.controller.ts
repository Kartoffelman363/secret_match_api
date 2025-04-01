import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RegUserBody } from '../types/RegUserBody';
import { LoginUserBody } from '../types/LoginUserBody';
import { LoginRes } from '../types/LoginRes';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async postRegister(@Body() regUserBody: RegUserBody): Promise<void> {
    await this.usersService.register(regUserBody);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async postLogin(@Body() loginUserBody: LoginUserBody): Promise<LoginRes> {
    return await this.usersService.login(loginUserBody);
  }
}
