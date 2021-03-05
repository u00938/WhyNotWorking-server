"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = require("express");
const users_1 = require("../controller/users");
exports.users = express_1.Router();
exports.users.get('/', users_1.controller.get);
exports.users.get('/count', users_1.controller.getCount);
exports.users.post('/', users_1.controller.signUp);
exports.users.patch('/', users_1.controller.patch);
//# sourceMappingURL=users.js.map