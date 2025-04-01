import { BadRequestException, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { RegUsrBody } from '../types/RegUsrBody';
import { JwtService } from '@nestjs/jwt';
import { LoginUsrBody } from '../types/LoginUsrBody';
import { LoginRes } from '../types/LoginRes';
import { Admin } from './admin.model';
import { AdminUser } from '../types/AdminUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Admin)
    private adminModel: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}
  async register(regUsrBody: RegUsrBody): Promise<void> {
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
        throw new BadRequestException('User already exists');
      }
    }
  }

  async login(loginUsrBody: LoginUsrBody): Promise<LoginRes> {
    return {
      jwtToken: await this.jwtService.signAsync({
        username: loginUsrBody.email,
      }),
    };
  }

  async findOneByEmail(email: string): Promise<User> {
    let usr: User | null;
    try {
      usr = await this.userModel.findOne({
        where: {
          email: email,
        },
      });
    } catch {
      throw new BadRequestException('Database error');
    }
    if (usr === null) {
      throw new BadRequestException('User not found');
    }
    return usr;
  }

  async findAdminByEmail(email: string): Promise<AdminUser> {
    let usr: User | null;
    let admin: Admin | null;
    try {
      usr = await this.userModel.findOne({
        where: {
          email: email,
        },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('User not found');
    }
    if (usr === null) {
      throw new BadRequestException('User not found');
    }
    try {
      admin = await this.adminModel.findOne({
        where: {
          uid: usr.id,
        },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Admin not found');
    }
    if (admin === null) {
      throw new BadRequestException('Admin not found');
    }
    return { user: usr, admin: admin };
  }
}
