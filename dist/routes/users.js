"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = require("express");
const users_1 = require("../controller/users");
const token_1 = require("../middleware/token");
const multer_1 = __importDefault(require("multer"));
const upload = multer_1.default();
exports.users = express_1.Router();
exports.users.get('/', token_1.tokenChecker, users_1.controller.get);
exports.users.get('/count', token_1.tokenChecker, users_1.controller.getCount);
exports.users.post('/', users_1.controller.signUp);
exports.users.patch('/', [token_1.tokenChecker, upload.single("image")], users_1.controller.patch);
//# sourceMappingURL=users.js.map