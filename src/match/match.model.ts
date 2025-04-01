import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { MatchRound } from './match_round.model';

@Table({ timestamps: false, tableName: 'match' })
export class Match extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  declare id: number;
  @AllowNull(false)
  @Unique
  @ForeignKey(() => MatchRound)
  @Column
  round_id: number;
  @AllowNull(true)
  @Unique
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  uid1: number | null;
  @AllowNull(true)
  @Unique
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  uid2: number | null;
}
