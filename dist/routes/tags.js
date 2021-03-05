"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = void 0;
const express_1 = require("express");
const tags_1 = require("../controller/tags");
exports.tags = express_1.Router();
exports.tags.get('/', tags_1.controller.get);
exports.tags.get('/count', tags_1.controller.getCount);
exports.tags.post('/', tags_1.controller.post);
exports.tags.delete('/', tags_1.controller.delete);
//# sourceMappingURL=tags.js.map