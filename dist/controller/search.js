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
const sequelize_1 = require("sequelize");
exports.controller = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = req.query;
            let pageNum = query.page;
            let offset = 0;
            if (pageNum > 1) {
                offset = 15 * (pageNum - 1);
            }
            const scope = (condition) => __awaiter(void 0, void 0, void 0, function* () {
                yield Post_1.Post.addScope("hasParticularTag", {
                    attributes: ["id"],
                    include: [
                        { model: Tag_1.Tag,
                            attributes: [],
                            as: "tag",
                            where: { tagName: condition }
                        }
                    ]
                }, {
                    override: true
                });
            });
            if (query.tag) {
                scope(query.tag);
                const postByTag = yield Post_1.Post.findAll({
                    include: [
                        {
                            model: Post_1.Post.scope("hasParticularTag"),
                            required: true,
                            as: "post",
                            attributes: []
                        },
                        { model: User_1.User, attributes: ["nickname", "image"] },
                        { model: PostTag_1.PostTag, attributes: ["tagId"],
                            include: [{
                                    model: Tag_1.Tag,
                                    attributes: ["tagName"],
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
                const tagDetail = yield Tag_1.Tag.findOne({ where: { tagName: query.tag } });
                res.status(200).json({ data: { tagDetail, postByTag }, message: "ok" });
            }
            if (query.answers === "0") {
            }
            if (query.user) {
            }
            if (query.score) {
            }
            if (query.word) {
                const postByword = yield Post_1.Post.findAll({
                    include: [
                        { model: User_1.User, attributes: ["nickname", "image"] },
                        { model: PostTag_1.PostTag, attributes: ["tagId"],
                            include: [{
                                    model: Tag_1.Tag,
                                    attributes: ["tagName"],
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
                    where: {
                        body: {
                            [sequelize_1.Op.like]: "%" + query.word + "%"
                        }
                    },
                    offset,
                    limit: 15
                });
                res.status(200).json({ data: { postByword }, message: "ok" });
            }
            if (query.isaccepted) {
            }
            if (query.q) {
                const isTagName = yield Tag_1.Tag.findOne({ where: { tagName: query.q } });
                if (isTagName) {
                    scope(query.q);
                    const postByTag = yield Post_1.Post.findAll({
                        include: [
                            {
                                model: Post_1.Post.scope("hasParticularTag"),
                                required: true,
                                as: "post",
                                attributes: []
                            },
                            { model: User_1.User, attributes: ["nickname", "image"] },
                            { model: PostTag_1.PostTag, attributes: ["tagId"],
                                include: [{
                                        model: Tag_1.Tag,
                                        attributes: ["tagName"],
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
                    res.status(200).json({ data: { isTagName, postByTag }, message: "ok" });
                }
                else {
                    const postLike = yield Post_1.Post.findAll({
                        include: [
                            { model: User_1.User, attributes: ["nickname", "image"] },
                            { model: PostTag_1.PostTag, attributes: ["tagId"],
                                include: [{
                                        model: Tag_1.Tag,
                                        attributes: ["tagName"],
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
                        where: {
                            body: {
                                [sequelize_1.Op.like]: "%" + query.q + "%"
                            }
                        },
                        offset,
                        limit: 15
                    });
                    res.status(200).json({ data: { postLike }, message: "ok" });
                }
            }
        }
        catch (err) {
            console.log(err.message);
        }
    })
};
//# sourceMappingURL=search.js.map