import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from '../users/admin.model';

@Module({
  imports: [SequelizeModule.forFeature([Admin])],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}
