"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const express_1 = require("express");
const logout_1 = require("../controller/logout");
exports.logout = express_1.Router();
exports.logout.post('/', logout_1.controller.post);
//# sourceMappingURL=logout.js.map