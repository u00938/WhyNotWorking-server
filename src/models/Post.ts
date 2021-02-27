import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, Model, NotEmpty, PrimaryKey, Table } from "sequelize-typescript"

import { User } from "./User";
import { Tag } from "./Tag";
import { PostTag } from "./PostTag";

export interface PostI {
  id?: number
  userId: number
  title: string
  body: string
  votes: number
  views: number
}

@Table({
  tableName: "posts",
  timestamps: true
})
export class Post extends Model implements PostI {

  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number

  @ForeignKey(() => User)
  @AllowNull(false)
  @NotEmpty
  @Column
  userId!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  title!: string

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.TEXT)
  body!: string

  @Default(0)
  @AllowNull(false)
  @NotEmpty
  @Column
  votes!: number

  @Default(0)
  @AllowNull(false)
  @NotEmpty
  @Column
  views!: number

  @BelongsTo(() => User) 
  user!: User;

  @HasMany(() => PostTag)
  postTag!: PostTag[]

  @BelongsToMany(() => Tag, () => PostTag)
  postTags!: PostTag[];

}