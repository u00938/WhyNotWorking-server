"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = void 0;
const express_1 = require("express");
const tags_1 = require("../controller/tags");
const token_1 = require("../middleware/token");
exports.tags = express_1.Router();
exports.tags.get('/', tags_1.controller.get);
exports.tags.get('/allTags', tags_1.controller.getAllTags);
exports.tags.get('/count', tags_1.controller.getCount);
exports.tags.get('/getTags', tags_1.controller.getTags);
exports.tags.post('/', token_1.tokenChecker, tags_1.controller.post);
exports.tags.delete('/', token_1.tokenChecker, tags_1.controller.delete);
//# sourceMappingURL=tags.js.map