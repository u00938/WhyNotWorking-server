import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

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