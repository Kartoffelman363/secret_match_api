import { BadRequestException, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { RegUserBody } from '../types/RegUserBody';
import { JwtService } from '@nestjs/jwt';
import { LoginUserBody } from '../types/LoginUserBody';
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
  async register(regUserBody: RegUserBody): Promise<void> {
    const salt = await genSalt();
    const pwdHash = await hash(regUserBody.password, salt);
    try {
      await this.userModel.create({
        name: regUserBody.name,
        email: regUserBody.email,
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

  async login(loginUserBody: LoginUserBody): Promise<LoginRes> {
    return {
      jwtToken: await this.jwtService.signAsync({
        username: loginUserBody.email,
      }),
    };
  }

  async findOneByEmail(email: string): Promise<User> {
    let user: User | null;
    try {
      user = await this.userModel.findOne({
        where: {
          email: email,
        },
      });
    } catch {
      throw new BadRequestException('Database error');
    }
    if (user == null) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findAdminByEmail(email: string): Promise<AdminUser> {
    let user: User | null;
    let admin: Admin | null;
    try {
      user = await this.userModel.findOne({
        where: {
          email: email,
        },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('User not found');
    }
    if (user == null) {
      throw new BadRequestException('User not found');
    }
    try {
      admin = await this.adminModel.findOne({
        where: {
          uid: user.id,
        },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Admin not found');
    }
    if (admin == null) {
      throw new BadRequestException('Admin not found');
    }
    return { user: user, admin: admin };
  }
}
