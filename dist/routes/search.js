"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const express_1 = require("express");
const search_1 = require("../controller/search");
exports.search = express_1.Router();
exports.search.get('/', search_1.controller.get);
//# sourceMappingURL=search.js.map