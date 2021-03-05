"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = void 0;
const express_1 = require("express");
const posts_1 = require("../controller/posts");
exports.posts = express_1.Router();
exports.posts.get('/', posts_1.controller.get);
exports.posts.post('/', posts_1.controller.post);
exports.posts.patch('/', posts_1.controller.patch);
exports.posts.delete('/', posts_1.controller.delete);
exports.posts.patch('/viewsUp', posts_1.controller.viewsUp);
exports.posts.patch('/votesUp', posts_1.controller.votesUp);
exports.posts.patch('/votesDown', posts_1.controller.votesDown);
//# sourceMappingURL=posts.js.map