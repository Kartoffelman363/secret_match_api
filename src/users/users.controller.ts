import { Controller, Get } from '@nestjs/common';
import { RegisterResult, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('register')
  getRegister(): RegisterResult {
    return this.usersService.register();
  }
}
