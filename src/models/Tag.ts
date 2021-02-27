import { AllowNull, AutoIncrement, BelongsToMany, Column, HasMany, Model, NotEmpty, PrimaryKey, Table } from "sequelize-typescript"

import { Post } from "./Post";
import { PostTag } from "./PostTag";

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

  @AllowNull(false)
  @NotEmpty
  @Column
  detail!: string

  @HasMany(() => PostTag)
  postTag!: PostTag[]

  @BelongsToMany(() => Post, () => PostTag)
  postTags!: PostTag[];

}