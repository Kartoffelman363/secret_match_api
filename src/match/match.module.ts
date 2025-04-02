import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Match } from './match.model';
import { MatchRound } from './match_round.model';
import { MatchRoundSignup } from './match_round_signup.model';
import { User } from '../users/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Match, MatchRound, MatchRoundSignup, User]),
  ],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}
