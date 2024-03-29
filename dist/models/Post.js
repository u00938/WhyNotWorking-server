"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Post_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
const Tag_1 = require("./Tag");
const PostTag_1 = require("./PostTag");
const Answer_1 = require("./Answer");
const Choose_1 = require("../models/Choose");
let Post = Post_1 = class Post extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Post_1),
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.User),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Post.prototype, "votes", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Post.prototype, "views", void 0);
__decorate([
    sequelize_typescript_1.Default(""),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Post.prototype, "voteUpUser", void 0);
__decorate([
    sequelize_typescript_1.Default(""),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Post.prototype, "voteDownUser", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => Post_1, { constraints: false }),
    __metadata("design:type", Array)
], Post.prototype, "post", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => User_1.User),
    __metadata("design:type", User_1.User)
], Post.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => PostTag_1.PostTag),
    __metadata("design:type", Array)
], Post.prototype, "postTag", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Answer_1.Answer),
    __metadata("design:type", Array)
], Post.prototype, "answer", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Tag_1.Tag, () => PostTag_1.PostTag),
    __metadata("design:type", Array)
], Post.prototype, "tag", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => Choose_1.Choose),
    __metadata("design:type", Array)
], Post.prototype, "chooseTable", void 0);
Post = Post_1 = __decorate([
    sequelize_typescript_1.Table({
        tableName: "posts",
        timestamps: true
    })
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map