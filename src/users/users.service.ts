import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { RegUsrBody, User } from './user.model';
import { Admin } from './admin.model';

export interface Result {
  success: boolean;
  extra?: any;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Admin)
    private adminModel: typeof Admin,
  ) {}
  async register(regUsrBody: RegUsrBody): Promise<Result> {
    const salt = await genSalt();
    const pwdHash = await hash(regUsrBody.password, salt);
    try {
      await this.userModel.create({
        name: regUsrBody.name,
        email: regUsrBody.email,
        password: pwdHash,
      });
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        return { success: false, extra: 'User already exists' };
      }
    }
    return {
      extra: {
        pwd: regUsrBody.password,
        hash: pwdHash,
        name: regUsrBody.name,
        email: regUsrBody.email,
        users: await this.userModel.findAll(),
        admins: await this.adminModel.findAll(),
      },
      success: await compare(regUsrBody.password, pwdHash),
    };
  }
  login(): Result {
    return { success: true };
  }
}
