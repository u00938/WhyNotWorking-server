import { AllowNull, AutoIncrement, BelongsToMany, Column, Model, NotEmpty, PrimaryKey, Table } from "sequelize-typescript"

import { Post } from "./Post";
import { PostTag } from "./PostTag";

export interface TagI {
  id?: number
  tagName: string
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

  @BelongsToMany(() => Post, () => PostTag)
  postTags!: PostTag[];

}