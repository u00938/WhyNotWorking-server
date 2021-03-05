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
const Post_1 = require("../models/Post");
const Tag_1 = require("../models/Tag");
const PostTag_1 = require("../models/PostTag");
const Answer_1 = require("../models/Answer");
const User_1 = require("../models/User");
exports.controller = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = req.query;
            if (query.page) {
                let pageNum = query.page;
                let offset = 0;
                if (pageNum > 1) {
                    offset = 15 * (pageNum - 1);
                }
                const postByPage = yield Post_1.Post.findAll({
                    include: [
                        { model: User_1.User, attributes: ["nickname", "image"] },
                        { model: PostTag_1.PostTag, attributes: ["tagId"],
                            include: [{
                                    model: Tag_1.Tag,
                                    attributes: ["tagName"]
                                }]
                        },
                        { model: Answer_1.Answer,
                            attributes: ["body", "votes", "choose"],
                            include: [{
                                    model: User_1.User,
                                    attributes: ["nickname", "image"]
                                }]
                        },
                    ],
                    offset,
                    limit: 15
                });
                res.status(200).json({ data: postByPage, message: "ok" });
            }
            if (query.user_id) {
                const postByUser = yield Post_1.Post.findAll({
                    include: [
                        { model: User_1.User, attributes: ["nickname", "image"] },
                        { model: PostTag_1.PostTag, attributes: ["tagId"],
                            include: [{
                                    model: Tag_1.Tag,
                                    attributes: ["tagName"]
                                }]
                        },
                        { model: Answer_1.Answer,
                            attributes: ["body", "votes", "choose"],
                            include: [{
                                    model: User_1.User,
                                    attributes: ["nickname", "image"]
                                }]
                        },
                    ],
                    where: { userId: query.user_id }
                });
                res.status(200).json({ data: postByUser, message: "ok" });
            }
            if (query.post_id) {
                const postById = yield Post_1.Post.findAll({
                    include: [
                        { model: User_1.User, attributes: ["nickname", "image"] },
                        { model: PostTag_1.PostTag, attributes: ["tagId"],
                            include: [{
                                    model: Tag_1.Tag,
                                    attributes: ["tagName"]
                                }]
                        },
                        { model: Answer_1.Answer,
                            attributes: ["body", "votes", "choose"],
                            include: [{
                                    model: User_1.User,
                                    attributes: ["nickname", "image"]
                                }]
                        },
                    ],
                    where: { id: query.post_id }
                });
                res.status(200).json({ data: postById, message: "ok" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, title, body } = req.body;
            if (userId && title && body) {
                yield Post_1.Post.create({ userId, title, body });
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
            const { id, title, body } = req.body;
            if (id && title && body) {
                yield Post_1.Post.update({ title, body }, { where: { id } });
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
                yield Post_1.Post.destroy({ where: { id } });
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
    viewsUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, views } = req.body;
            if (id && views) {
                yield Post_1.Post.update({ views: views + 1 }, { where: { id } });
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
    votesUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, votes } = req.body;
            if (id && votes) {
                yield Post_1.Post.update({ votes: votes + 1 }, { where: { id } });
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
    votesDown: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, votes } = req.body;
            if (id && votes) {
                yield Post_1.Post.update({ votes: votes - 1 }, { where: { id } });
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
};
//# sourceMappingURL=posts.js.map