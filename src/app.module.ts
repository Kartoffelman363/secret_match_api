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

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      //TODO env
      username: 'root',
      password: 'root',
      database: 'secret_match',
      models: [User, Admin, Match, MatchRound, MatchRoundSignup],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MatchModule,
  ],
})
export class AppModule {}
