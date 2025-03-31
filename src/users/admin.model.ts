import {
  AllowNull,
  AutoIncrement,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ timestamps: false })
export class Admin extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  declare id: number;
  @AllowNull(false)
  @Unique
  @ForeignKey(() => User)
  @Column
  uid: number;
  @AllowNull(false)
  @Default(true)
  @Column
  active: boolean;
}
