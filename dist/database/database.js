"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const User_1 = require("../models/User");
const Post_1 = require("../models/Post");
const Tag_1 = require("../models/Tag");
const PostTag_1 = require("../models/PostTag");
const UserTag_1 = require("../models/UserTag");
const Answer_1 = require("../models/Answer");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    dialect: "mysql",
    models: [User_1.User, Post_1.Post, Tag_1.Tag, PostTag_1.PostTag, UserTag_1.UserTag, Answer_1.Answer]
});
//# sourceMappingURL=database.js.map