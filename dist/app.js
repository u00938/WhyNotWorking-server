"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database/database");
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const answers_1 = require("./routes/answers");
const login_1 = require("./routes/login");
const logout_1 = require("./routes/logout");
const posts_1 = require("./routes/posts");
const postTags_1 = require("./routes/postTags");
const tags_1 = require("./routes/tags");
const users_1 = require("./routes/users");
const userTags_1 = require("./routes/userTags");
const search_1 = require("./routes/search");
// CLI에서 export NODE_ENV='production or development' 실행하고 작업해주세요
if (process.env.NODE_ENV === "production") {
    dotenv_1.default.config({ path: path_1.default.join(__dirname, "../.env.production") });
}
else if (process.env.NODE_ENV === "development") {
    dotenv_1.default.config({ path: path_1.default.join(__dirname, "../.env.development") });
}
else {
    throw new Error("process.env.NODE_ENV를 설정하지 않았습니다.");
}
const port = process.env.SERVER_PORT || 4000;
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(cookie_parser_1.default());
app.use(body_parser_1.json());
app.use(helmet_1.default());
app.use(cors_1.default({
    origin: process.env.CORS_ORIGIN,
    methods: "GET, POST, PATCH, DELETE, OPTIONS",
    credentials: true
}));
app.use("/answers", answers_1.answers);
app.use("/login", login_1.login);
app.use("/logout", logout_1.logout);
app.use("/posts", posts_1.posts);
app.use("/postTags", postTags_1.postTags);
app.use("/tags", tags_1.tags);
app.use("/users", users_1.users);
app.use("/userTags", userTags_1.userTags);
app.use("/search", search_1.search);
app.listen(port, () => {
    console.log("Hello");
    database_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("database connected");
        try {
            yield database_1.sequelize.sync();
        }
        catch (error) {
            console.log(error.message);
        }
    })).catch((e) => {
        console.log(e.message);
    });
});
//# sourceMappingURL=app.js.map