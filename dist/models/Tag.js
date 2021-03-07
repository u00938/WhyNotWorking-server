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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Post_1 = require("./Post");
const User_1 = require("./User");
const PostTag_1 = require("./PostTag");
const UserTag_1 = require("./UserTag");
let Tag = class Tag extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Tag.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Tag.prototype, "tagName", void 0);
__decorate([
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Tag.prototype, "detail", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => PostTag_1.PostTag),
    __metadata("design:type", Array)
], Tag.prototype, "postTag", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => UserTag_1.UserTag),
    __metadata("design:type", Array)
], Tag.prototype, "userTag", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Post_1.Post, () => PostTag_1.PostTag),
    __metadata("design:type", Array)
], Tag.prototype, "postTags", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => User_1.User, () => UserTag_1.UserTag),
    __metadata("design:type", Array)
], Tag.prototype, "userTags", void 0);
Tag = __decorate([
    sequelize_typescript_1.Table({
        tableName: "tags",
        timestamps: true
    })
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map