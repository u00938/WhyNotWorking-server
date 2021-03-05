"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = require("express");
const login_1 = require("../controller/login");
exports.login = express_1.Router();
exports.login.post('/', login_1.controller.post);
exports.login.post('/googleLogin', login_1.controller.googleLogin);
//# sourceMappingURL=login.js.map