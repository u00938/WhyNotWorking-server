"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTags = void 0;
const express_1 = require("express");
const userTags_1 = require("../controller/userTags");
const token_1 = require("../middleware/token");
exports.userTags = express_1.Router();
exports.userTags.post('/', token_1.tokenChecker, userTags_1.controller.post);
exports.userTags.delete('/', token_1.tokenChecker, userTags_1.controller.delete);
//# sourceMappingURL=userTags.js.map