import { Module } from '@nestjs/common';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Admin]),
    JwtModule.register({
      //TODO env
      secret: 'aaaaaaaaaaa',
      signOptions: { expiresIn: '2m' },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
