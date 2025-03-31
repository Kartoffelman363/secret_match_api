import { Module } from '@nestjs/common';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Admin])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
