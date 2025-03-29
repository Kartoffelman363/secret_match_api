import { Injectable } from '@nestjs/common';

export interface RegisterResult {
  success: boolean;
}

@Injectable()
export class UsersService {
  register(): RegisterResult {
    return { success: true };
  }
}
