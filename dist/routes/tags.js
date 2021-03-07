"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = void 0;
const express_1 = require("express");
const tags_1 = require("../controller/tags");
const token_1 = require("../middleware/token");
exports.tags = express_1.Router();
exports.tags.get('/', token_1.tokenChecker, tags_1.controller.get);
exports.tags.get('/count', token_1.tokenChecker, tags_1.controller.getCount);
exports.tags.post('/', token_1.tokenChecker, tags_1.controller.post);
exports.tags.delete('/', token_1.tokenChecker, tags_1.controller.delete);
//# sourceMappingURL=tags.js.map