import { Body, Controller, Post } from '@nestjs/common';
import { Result, UsersService } from './users.service';
import { RegUsrBody } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async postRegister(@Body() regUsrBody: RegUsrBody): Promise<Result> {
    return await this.usersService.register(regUsrBody);
  }

  @Post('login')
  postLogin(): Result {
    return this.usersService.login();
  }
}
