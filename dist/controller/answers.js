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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const Answer_1 = require("../models/Answer");
const Post_1 = require("../models/Post");
const Choose_1 = require("../models/Choose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
                    include: [
                        { model: Post_1.Post, attributes: ["title"] }
                    ],
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
            const { id } = req.query;
            if (id) {
                const findAnswer = yield Answer_1.Answer.findOne({ where: { id } });
                const postId = findAnswer.postId;
                const isChoose = yield Choose_1.Choose.findOne({ where: { postId } });
                if (isChoose) {
                    if (isChoose.answerId.toString() === id) {
                        yield Answer_1.Answer.update({ choose: false }, { where: { id } });
                        yield Choose_1.Choose.destroy({ where: { postId } });
                        res.status(200).json({ data: null, message: "ok" });
                    }
                    else {
                        res.status(400).json({ data: null, message: "already closed post" });
                    }
                }
                else {
                    yield Answer_1.Answer.update({ choose: true }, { where: { id } });
                    yield Choose_1.Choose.create({ postId, answerId: id });
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
    }),
    votesUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.query;
            if (id) {
                const authorization = req.headers['authorization'];
                const token = authorization.split(' ')[1];
                jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                    const findPost = yield Answer_1.Answer.findOne({ where: { id } });
                    let voteUpUser = findPost.voteUpUser;
                    let voteUpArr = voteUpUser.split(" ");
                    let upIndex = voteUpArr.indexOf(result.id.toString());
                    let voteDownUser = findPost.voteDownUser;
                    let voteDownArr = voteDownUser.split(" ");
                    let downIndex = voteDownArr.indexOf(result.id.toString());
                    if (downIndex !== -1 && upIndex === -1) {
                        voteDownArr.splice(downIndex, 1);
                        voteDownUser = voteDownArr.join(" ");
                        const postVotes = findPost.votes;
                        yield Answer_1.Answer.update({ voteDownUser, votes: postVotes + 1 }, { where: { id } });
                        res.status(200).json({ data: null, message: "ok" });
                    }
                    else if (downIndex === -1 && upIndex === -1) {
                        voteUpArr.push(result.id.toString());
                        voteUpUser = voteUpArr.join(" ");
                        const postVotes = findPost.votes;
                        yield Answer_1.Answer.update({ voteUpUser, votes: postVotes + 1 }, { where: { id } });
                        res.status(200).json({ data: null, message: "ok" });
                    }
                    else {
                        res.status(400).json({ data: null, message: "You have already voted" });
                    }
                }));
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
            const { id } = req.query;
            if (id) {
                const authorization = req.headers['authorization'];
                const token = authorization.split(' ')[1];
                jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                    const findPost = yield Answer_1.Answer.findOne({ where: { id } });
                    let voteUpUser = findPost.voteUpUser;
                    let voteUpArr = voteUpUser.split(" ");
                    let upIndex = voteUpArr.indexOf(result.id.toString());
                    let voteDownUser = findPost.voteDownUser;
                    let voteDownArr = voteDownUser.split(" ");
                    let downIndex = voteDownArr.indexOf(result.id.toString());
                    if (upIndex !== -1 && downIndex === -1) {
                        voteUpArr.splice(downIndex, 1);
                        voteUpUser = voteUpArr.join(" ");
                        const postVotes = findPost.votes;
                        yield Answer_1.Answer.update({ voteUpUser, votes: postVotes - 1 }, { where: { id } });
                        res.status(200).json({ data: null, message: "ok" });
                    }
                    else if (upIndex === -1 && downIndex === -1) {
                        voteDownArr.push(result.id.toString());
                        voteDownUser = voteDownArr.join(" ");
                        const postVotes = findPost.votes;
                        yield Answer_1.Answer.update({ voteDownUser, votes: postVotes - 1 }, { where: { id } });
                        res.status(200).json({ data: null, message: "ok" });
                    }
                    else {
                        res.status(400).json({ data: null, message: "You have already voted" });
                    }
                }));
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