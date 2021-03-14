import { AllowNull, AutoIncrement, BelongsTo, Column, ForeignKey, Model, NotEmpty, PrimaryKey, Table } from "sequelize-typescript"

import { Answer } from "./Answer";
import { Post } from "./Post";

export interface ChooseI {
  id?: number
  postId: number
  answerId: number
}

@Table({
  tableName: "choose",
  timestamps: true
})
export class Choose extends Model implements ChooseI {

  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number

  @ForeignKey(() => Post)
  @AllowNull(false)
  @NotEmpty
  @Column
  postId!: number

  @ForeignKey(() => Answer)
  @AllowNull(false)
  @NotEmpty
  @Column
  answerId!: number

  @BelongsTo(() => Post)
  posts!: Post;

  @BelongsTo(() => Answer)
  answers!: Answer;
}