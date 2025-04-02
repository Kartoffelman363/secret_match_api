import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ timestamps: false, tableName: 'match_round' })
export class MatchRound extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  declare id: number;
  @AllowNull(false)
  @Column
  start_time: Date;
  @Column
  end_time: Date;
}
