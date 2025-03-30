import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admins, Users } from './users/users.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'secret_match',
      models: [Users, Admins],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
