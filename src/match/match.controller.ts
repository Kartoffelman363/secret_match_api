import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { AuthGuard } from '@nestjs/passport';
import { userFromReq, UserFromReq } from '../types/UserFromReq';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('join')
  postJoin(@Request() req: object) {
    const user: UserFromReq | null = userFromReq(req);
    if (user == null) {
      throw new BadRequestException();
    }
    return this.matchService.join(user.username);
  }

  @UseGuards(AuthGuard('admin'))
  @Post('assign')
  postAssign() {
    return this.matchService.assign();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('view')
  getView(@Request() req: object) {
    const user: UserFromReq | null = userFromReq(req);
    if (user == null) {
      throw new BadRequestException();
    }
    return this.matchService.view(user.username);
  }
}
