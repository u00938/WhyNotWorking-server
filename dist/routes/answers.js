"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answers = void 0;
const express_1 = require("express");
const answers_1 = require("../controller/answers");
exports.answers = express_1.Router();
exports.answers.get('/', answers_1.controller.get);
exports.answers.post('/', answers_1.controller.post);
exports.answers.patch('/', answers_1.controller.patch);
exports.answers.delete('/', answers_1.controller.delete);
exports.answers.patch('/toggleChoose', answers_1.controller.toggleChoose);
exports.answers.patch('/votesUp', answers_1.controller.votesUp);
exports.answers.patch('/votesDown', answers_1.controller.votesDown);
//# sourceMappingURL=answers.js.map