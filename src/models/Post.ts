import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, HasOne, Model, NotEmpty, PrimaryKey, Table } from "sequelize-typescript"

import { User } from "./User";
import { Tag } from "./Tag";
import { PostTag } from "./PostTag";
import { Answer } from "./Answer";

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
  
  @ForeignKey(() => Post)
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

  @HasOne(() => Post, { constraints: false })
  post!: Post[]

  @BelongsTo(() => User) 
  user!: User;

  @HasMany(() => PostTag)
  postTag!: PostTag[]

  @HasMany(() => Answer)
  answer!: Answer[];

  @BelongsToMany(() => Tag, () => PostTag)
  tag!: Tag[];

}