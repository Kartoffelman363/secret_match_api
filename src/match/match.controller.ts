import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('join')
  postJoin() {
    return this.matchService.join();
  }

  @UseGuards(AuthGuard('admin'))
  @Post('assign')
  postAssign() {
    return this.matchService.assign();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('view')
  getView() {
    return this.matchService.view();
  }
}
