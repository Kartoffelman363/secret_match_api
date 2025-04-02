import {
  Column,
  Model,
  Table,
  Max,
  AutoIncrement,
  PrimaryKey,
  Unique,
  AllowNull,
} from 'sequelize-typescript';

@Table({ timestamps: false, tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  declare id: number;
  @AllowNull(false)
  @Max(100)
  @Column
  name: string;
  @AllowNull(false)
  @Unique
  @Max(320)
  @Column
  email: string;
  @AllowNull(false)
  @Max(60)
  @Column
  password: string;
}
