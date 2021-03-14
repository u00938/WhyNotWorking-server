"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// CLI에서 export NODE_ENV='production or development' 실행하고 작업해주세요
if (process.env.NODE_ENV === "production") {
    dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env.production") });
}
else if (process.env.NODE_ENV === "development") {
    dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env.development") });
}
else {
    throw new Error("process.env.NODE_ENV를 설정하지 않았습니다.");
}
const User_1 = require("../models/User");
const Post_1 = require("../models/Post");
const Tag_1 = require("../models/Tag");
const PostTag_1 = require("../models/PostTag");
const UserTag_1 = require("../models/UserTag");
const Answer_1 = require("../models/Answer");
const Choose_1 = require("../models/Choose");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    host: "localhost",
    username: "databaseuser",
    password: "young4262",
    database: "whynotworking",
    dialect: "mysql",
    models: [User_1.User, Post_1.Post, Tag_1.Tag, PostTag_1.PostTag, UserTag_1.UserTag, Answer_1.Answer, Choose_1.Choose]
});
//# sourceMappingURL=database.js.map