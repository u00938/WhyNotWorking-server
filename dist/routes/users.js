"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = require("express");
const users_1 = require("../controller/users");
const token_1 = require("../middleware/token");
exports.users = express_1.Router();
exports.users.get('/', token_1.tokenChecker, users_1.controller.get);
exports.users.get('/count', token_1.tokenChecker, users_1.controller.getCount);
exports.users.post('/', users_1.controller.signUp);
exports.users.patch('/', token_1.tokenChecker, users_1.controller.patch);
//# sourceMappingURL=users.js.map