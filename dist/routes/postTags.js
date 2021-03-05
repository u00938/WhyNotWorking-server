"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTags = void 0;
const express_1 = require("express");
const postTags_1 = require("../controller/postTags");
exports.postTags = express_1.Router();
exports.postTags.post('/', postTags_1.controller.post);
exports.postTags.delete('/', postTags_1.controller.delete);
//# sourceMappingURL=postTags.js.map