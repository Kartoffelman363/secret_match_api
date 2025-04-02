import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { Admin } from './users/admin.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MatchModule } from './match/match.module';
import { Match } from './match/match.model';
import { MatchRound } from './match/match_round.model';
import { MatchRoundSignup } from './match/match_round_signup.model';
import * as process from 'node:process';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? 'root',
      database: process.env.DB_NAME ?? 'secret_match',
      models: [User, Admin, Match, MatchRound, MatchRoundSignup],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MatchModule,
  ],
})
export class AppModule {}
