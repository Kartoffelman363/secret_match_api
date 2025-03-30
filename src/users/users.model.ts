import {
  Column,
  Model,
  Table,
  Max,
  ForeignKey,
  Default,
  AutoIncrement,
  PrimaryKey,
  Unique,
  AllowNull,
} from 'sequelize-typescript';

@Table({ timestamps: false })
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column
  declare id: number;
  @AllowNull(false)
  @Max(100)
  @Column
  name: string;
  @AllowNull(false)
  @Max(320)
  @Column
  email: string;
  @AllowNull(false)
  @Max(60)
  @Column
  password: string;
}

@Table({ timestamps: false })
export class Admins extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column
  declare id: number;
  @AllowNull(false)
  @ForeignKey(() => Users)
  @Column
  admins_users_FK: number;
  @AllowNull(false)
  @Default(true)
  @Column
  active: boolean;
}
