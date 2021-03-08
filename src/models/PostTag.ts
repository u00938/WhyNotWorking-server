import { AllowNull, AutoIncrement, BelongsTo, Column, ForeignKey, Model, NotEmpty, PrimaryKey, Table } from "sequelize-typescript"

import { Post } from "./Post";
import { Tag } from "./Tag";

export interface PostTagI {
  id?: number
  postId: number
  tagId: number
}

@Table({
  tableName: "postTags",
  timestamps: true
})
export class PostTag extends Model implements PostTagI {

  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number

  @ForeignKey(() => Post)
  @AllowNull(false)
  @NotEmpty
  @Column
  postId!: number

  @ForeignKey(() => Tag)
  @AllowNull(false)
  @NotEmpty
  @Column
  tagId!: number

  @BelongsTo(() => Post)
  post!: Post;

  @BelongsTo(() => Tag)
  tag!: Tag;

}