"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTags = void 0;
const express_1 = require("express");
const postTags_1 = require("../controller/postTags");
const token_1 = require("../middleware/token");
exports.postTags = express_1.Router();
exports.postTags.post('/', token_1.tokenChecker, postTags_1.controller.post);
exports.postTags.delete('/', token_1.tokenChecker, postTags_1.controller.delete);
//# sourceMappingURL=postTags.js.map