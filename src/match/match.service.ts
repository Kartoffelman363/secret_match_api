import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '../users/admin.model';

@Injectable()
export class MatchService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  join(): string {
    return 'ok';
  }

  assign(): string {
    return 'ok';
  }

  view(): string {
    return 'ok';
  }
}
