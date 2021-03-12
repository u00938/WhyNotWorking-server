import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from "path";

// CLI에서 export NODE_ENV='production or development' 실행하고 작업해주세요
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.join(__dirname, "../../.env.production") });
} else if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: path.join(__dirname, "../../.env.development") });
} else {
  throw new Error("process.env.NODE_ENV를 설정하지 않았습니다.");
}

import { User } from "../models/User";
import { Post } from "../models/Post";
import { Tag } from "../models/Tag";
import { PostTag } from "../models/PostTag";
import { UserTag } from "../models/UserTag";
import { Answer } from "../models/Answer";

export const sequelize: Sequelize = new Sequelize({
  port: (process.env.DB_PORT as unknown) as number,
  host: process.env.DB_HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: "mysql",
  models: [User, Post, Tag, PostTag, UserTag, Answer]
})