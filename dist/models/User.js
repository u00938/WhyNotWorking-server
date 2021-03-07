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
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Post_1 = require("./Post");
const Answer_1 = require("./Answer");
const Tag_1 = require("./Tag");
const UserTag_1 = require("./UserTag");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], User.prototype, "aboutMe", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "location", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Post_1.Post),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Answer_1.Answer),
    __metadata("design:type", Array)
], User.prototype, "answers", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => UserTag_1.UserTag),
    __metadata("design:type", Array)
], User.prototype, "userTag", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Tag_1.Tag, () => UserTag_1.UserTag),
    __metadata("design:type", Array)
], User.prototype, "userTags", void 0);
User = __decorate([
    sequelize_typescript_1.Table({
        tableName: "users",
        timestamps: true
    })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map