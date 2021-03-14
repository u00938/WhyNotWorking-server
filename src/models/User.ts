import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, HasMany, Model, NotEmpty, PrimaryKey, Table, Unique } from "sequelize-typescript"

import { Post } from "./Post";
import { Answer } from "./Answer";
import { Tag } from "./Tag";
import { UserTag } from "./UserTag";
import { text } from "body-parser";

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

  @Unique
  @AllowNull(false)
  @NotEmpty
  @Column
  email!: string

  @Column
  image!: string

  @Column(DataType.TEXT)
  aboutMe!: string

  @Column
  location!: string

  @AllowNull(true)
  @NotEmpty
  @Column
  password!: string

  @HasMany(() => Post)
  post?: Post[]

  @HasMany(() => Answer)
  answer?: Answer[]

  @HasMany(() => UserTag)
  userTag!: UserTag[]

  @BelongsToMany(() => Tag, () => UserTag)
  tag!: Tag[];
}