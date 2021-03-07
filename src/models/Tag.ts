import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, HasMany, Model, NotEmpty, PrimaryKey, Table } from "sequelize-typescript"

import { Post } from "./Post";
import { User } from "./User";
import { PostTag } from "./PostTag";
import { UserTag } from "./UserTag";

export interface TagI {
  id?: number
  tagName: string
  detail: string
}

@Table({
  tableName: "tags",
  timestamps: true
})
export class Tag extends Model implements TagI {

  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number

  @AllowNull(false)
  @NotEmpty
  @Column
  tagName!: string

  @NotEmpty
  @Column(DataType.TEXT)
  detail!: string

  @HasMany(() => PostTag)
  postTag!: PostTag[]

  @HasMany(() => UserTag)
  userTag!: UserTag[]

  @BelongsToMany(() => Post, () => PostTag)
  postTags!: PostTag[];

  @BelongsToMany(() => User, () => UserTag)
  userTags!: UserTag[];





}