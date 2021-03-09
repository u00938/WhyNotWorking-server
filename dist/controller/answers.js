"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const Answer_1 = require("../models/Answer");
exports.controller = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = req.query;
            if (query.post_id) {
                const answerByPostId = yield Answer_1.Answer.findAll({
                    where: { postId: query.post_id }
                });
                if (answerByPostId)
                    res.status(200).json({ data: answerByPostId, message: "ok" });
                else
                    res.status(400).json({ data: null, message: "no answer" });
            }
            if (query.user_id) {
                const answerByUserId = yield Answer_1.Answer.findAll({
                    where: { userId: query.user_id }
                });
                if (answerByUserId)
                    res.status(200).json({ data: answerByUserId, message: "ok" });
                else
                    res.status(400).json({ data: null, message: "no answer" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { postId, userId, body } = req.body;
            if (postId && userId && body) {
                yield Answer_1.Answer.create({ postId, userId, body });
                res.status(200).json({ data: null, message: "ok" });
            }
            else {
                res.status(400).json({ data: null, message: "should send full data" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    patch: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, body } = req.body;
            if (id && body) {
                yield Answer_1.Answer.update({ id, body }, { where: { id } });
                res.status(200).json({ data: null, message: "ok" });
            }
            else {
                res.status(400).json({ data: null, message: "should send full data" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            if (id) {
                yield Answer_1.Answer.destroy({ where: { id } });
                res.status(200).json({ data: null, message: "ok" });
            }
            else {
                res.status(400).json({ data: null, message: "should send id" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    toggleChoose: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            if (id) {
                const findAnswer = yield Answer_1.Answer.findOne({ where: { id } });
                const isChoose = findAnswer.choose;
                yield Answer_1.Answer.update({ choose: !isChoose }, { where: { id } });
                res.status(200).json({ data: null, message: "ok" });
            }
            else {
                res.status(400).json({ data: null, message: "should send full data" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    votesUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            if (id) {
                const findAnswer = yield Answer_1.Answer.findOne({ where: { id } });
                const answerVotes = findAnswer.votes;
                yield Answer_1.Answer.update({ votes: answerVotes + 1 }, { where: { id } });
                res.status(200).json({ data: null, message: "ok" });
            }
            else {
                res.status(400).json({ data: null, message: "should send full data" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    votesDown: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            if (id) {
                const findAnswer = yield Answer_1.Answer.findOne({ where: { id } });
                const answerVotes = findAnswer.votes;
                if (answerVotes === 0) {
                    res.status(400).json({ data: null, message: "votes cannot be negative" });
                }
                else if (answerVotes > 0) {
                    yield Answer_1.Answer.update({ votes: answerVotes - 1 }, { where: { id } });
                    res.status(200).json({ data: null, message: "ok" });
                }
            }
            else {
                res.status(400).json({ data: null, message: "should send full data" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    })
};
//# sourceMappingURL=answers.js.map