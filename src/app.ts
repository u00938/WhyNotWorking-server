import express, { Application } from "express";
import { json }  from "body-parser";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { sequelize } from "./database/database";
import helmet from "helmet";

import { answers } from "./routes/answers";
import { login } from "./routes/login";
import { logout } from "./routes/logout";
import { posts } from "./routes/posts";
import { postTags } from "./routes/postTags";
import { tags } from "./routes/tags";
import { users } from "./routes/users";
import { userTags } from "./routes/userTags";

dotenv.config();

const port = process.env.SERVER_PORT || 4000;

const app: Application = express();

app.use(logger("dev"));
app.use(cookieParser());
app.use(json());
app.use(helmet());

app.use(
  cors({
    origin: true,
    methods: "GET, POST, PATCH, DELETE, OPTIONS",
    credentials: true
  })
);

app.use("/answers", answers);
app.use("/login", login);
app.use("/logout", logout);
app.use("/posts", posts);
app.use("/postTags", postTags);
app.use("/tags", tags);
app.use("/users", users);
app.use("/userTags", userTags);

app.listen(port, () => { 
  console.log("Hello")
  sequelize.authenticate().then(async ()=> {
    console.log("database connected")
    try {
      await sequelize.sync()
    } catch (error) {
      console.log(error.message)
    }
  }).catch((e:any) => {
    console.log(e.message)
  })
});
