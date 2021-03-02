import { AllowNull, AutoIncrement, Column, HasMany, Model, NotEmpty, PrimaryKey, Table } from "sequelize-typescript"

import { Post } from "./Post";
import { Answer } from "./Answer";

export interface UserI {
  id?: number
  nickname: string
  email: string
  image: string
  password: string
}

@Table({
  tableName: "users",
  timestamps: true
})
export class User extends Model implements UserI {

  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number

  @AllowNull(false)
  @NotEmpty
  @Column
  nickname!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  email!: string

  @NotEmpty
  @Column
  image!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  password!: string

  @HasMany(() => Post)
  posts?: Post[]

  @HasMany(() => Answer)
  answers?: Answer[]
}