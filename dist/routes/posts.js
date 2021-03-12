"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = void 0;
const express_1 = require("express");
const posts_1 = require("../controller/posts");
const token_1 = require("../middleware/token");
exports.posts = express_1.Router();
exports.posts.get('/', posts_1.controller.get);
exports.posts.get('/count', posts_1.controller.getCount);
exports.posts.get('/title', posts_1.controller.getTitle);
exports.posts.post('/', token_1.tokenChecker, posts_1.controller.post);
exports.posts.patch('/', token_1.tokenChecker, posts_1.controller.patch);
exports.posts.delete('/', token_1.tokenChecker, posts_1.controller.delete);
exports.posts.get('/viewsUp', token_1.tokenChecker, posts_1.controller.viewsUp);
exports.posts.get('/votesUp', token_1.tokenChecker, posts_1.controller.votesUp);
exports.posts.get('/votesDown', token_1.tokenChecker, posts_1.controller.votesDown);
//# sourceMappingURL=posts.js.map