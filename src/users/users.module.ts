import { Module } from '@nestjs/common';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from './admin.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Admin]),
    JwtModule.register({
      //TODO env
      secret: 'aaaaaaaaaaa',
      signOptions: { expiresIn: '1m' },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
