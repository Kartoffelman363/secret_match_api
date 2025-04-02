import {
  AllowNull,
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { MatchRound } from './match_round.model';
import { User } from '../users/user.model';

@Table({ timestamps: false, tableName: 'match_round_signup' })
export class MatchRoundSignup extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  declare id: number;
  @AllowNull(false)
  @NotNull
  @ForeignKey(() => MatchRound)
  @Column
  round_id: number;
  @AllowNull(false)
  @NotNull
  @ForeignKey(() => User)
  @Column
  uid: number;
}
