import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, Model, NotEmpty, PrimaryKey, Table } from "sequelize-typescript"

import { User } from "./User";
import { Post } from "./Post";

export interface AnswerI {
  id?: number
  postId: number
  userId: number
  body: string
  votes: number
  choose: boolean
}

@Table({
  tableName: "answers",
  timestamps: true
})
export class Answer extends Model implements AnswerI {

  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number

  @ForeignKey(() => Post)
  @AllowNull(false)
  @NotEmpty
  @Column
  postId!: number

  @ForeignKey(() => User)
  @AllowNull(false)
  @NotEmpty
  @Column
  userId!: number

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  body!: string

  @Default(0)
  @AllowNull(true)
  @Column
  votes!: number

  @Default(false)
  @AllowNull(true)
  @Column
  choose!: boolean

  @BelongsTo(() => User) 
  user!: User;

  @BelongsTo(() => Post) 
  post!: Post;
}