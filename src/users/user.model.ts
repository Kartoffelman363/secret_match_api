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

export interface RegUsrBody {
  email: string;
  name: string;
  password: string;
}

@Table({ timestamps: false })
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
