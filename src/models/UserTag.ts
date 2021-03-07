import { AllowNull, AutoIncrement, BelongsTo, Column, ForeignKey, Model, NotEmpty, PrimaryKey, Table } from "sequelize-typescript"

import { User } from "./User";
import { Tag } from "./Tag";

export interface UserTagI {
  id?: number
  userId: number
  tagId: number
}

@Table({
  tableName: "userTags",
  timestamps: true
})
export class UserTag extends Model implements UserTagI {

  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number

  @ForeignKey(() => User)
  @AllowNull(false)
  @NotEmpty
  @Column
  userId!: number

  @ForeignKey(() => Tag)
  @AllowNull(false)
  @NotEmpty
  @Column
  tagId!: number

  @BelongsTo(() => User)
  users!: User;

  @BelongsTo(() => Tag)
  tags!: Tag;

}