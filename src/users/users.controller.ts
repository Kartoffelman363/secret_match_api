import { Controller, Get } from '@nestjs/common';
import { Result, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('register')
  async getRegister(): Promise<Result> {
    return await this.usersService.register();
  }
}
