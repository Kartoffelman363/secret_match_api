import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Admins, Users } from './users.model';

export interface Result {
  success: boolean;
  extra?: any;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
    //@InjectModel(Admins)
    //private adminsModel: typeof Admins,
  ) {}
  async register(): Promise<Result> {
    const salt = genSaltSync();
    const pwd = 'krnekizelodolgogeslotkoreskrdolgomogocecelodal';
    const hash = hashSync(pwd, salt);
    return {
      extra: {
        pwd: pwd,
        hash: hash,
        salt: salt,
        users: await this.usersModel.findAll(),
      },
      success: compareSync(
        'krnekizelodolgogeslotkoreskrdolgomogocecelodal',
        hash,
      ),
    };
  }
  login(): Result {
    return { success: true };
  }
}
