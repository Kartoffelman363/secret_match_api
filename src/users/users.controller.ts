import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RegUsrBody } from '../types/RegUsrBody';
import { LoginUsrBody } from '../types/LoginUsrBody';
import { LoginRes } from '../types/LoginRes';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async postRegister(@Body() regUsrBody: RegUsrBody): Promise<void> {
    await this.usersService.register(regUsrBody);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async postLogin(@Body() loginUsrBody: LoginUsrBody): Promise<LoginRes> {
    return await this.usersService.login(loginUsrBody);
  }
}
