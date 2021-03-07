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
const sequelize_1 = require("sequelize");
const Tag_1 = require("../models/Tag");
const PostTag_1 = require("../models/PostTag");
const Post_1 = require("../models/Post");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
exports.controller = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.query.post_id) {
                const data = yield Tag_1.Tag.findAll({
                    attributes: ["id", "tagName"],
                    include: [{
                            model: Post_1.Post,
                            attributes: [],
                            where: { id: req.query.post_id }
                        }]
                });
                res.status(200).json({ data: data, message: "ok" });
            }
            else if (req.query.user_id) {
                const data = yield Tag_1.Tag.findAll({
                    attributes: ["id", "tagName", "detail"],
                    include: [{
                            model: Post_1.Post,
                            attributes: [],
                            where: { userId: req.query.user_id }
                        }]
                });
                res.status(200).json({ data: data, message: "ok" });
            }
            else if (req.query.page) {
                let pageNum = req.query.page;
                let offset = 0;
                if (pageNum > 1) {
                    offset = 36 * (pageNum - 1);
                }
                const data = yield Tag_1.Tag.findAll({
                    attributes: ["id", "tagName", "detail", [sequelize_1.Sequelize.fn("COUNT", "postTag.id"), "postCount"]],
                    include: [{
                            model: PostTag_1.PostTag,
                            as: "postTag",
                            attributes: [],
                            duplicating: false
                        }],
                    group: ["Tag.id"],
                    offset,
                    limit: 36
                });
                res.status(200).json({ data: data, message: "ok" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    getCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield Tag_1.Tag.findAll({
                attributes: [[sequelize_1.Sequelize.fn("COUNT", sequelize_1.Sequelize.col("id")), "count"]]
            });
            res.status(200).json({ data: data, message: "ok" });
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    getTags: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            function getTagData(url) {
                axios_1.default.get(url).then(res => {
                    const $ = cheerio_1.default.load(res.data);
                    const $tagData = $('#mainbar');
                    Tag_1.Tag.create({
                        tagName: $tagData.find("h1").text().replace("Questions tagged ", "").replace("[", "").replace("]", ""),
                        detail: $tagData.find("p").text()
                    });
                });
            }
            for (let i = 1; i < 7; i++) {
                axios_1.default.get(`https://stackoverflow.com/tags?page=${i}&tab=popular`).then(res => {
                    const $ = cheerio_1.default.load(res.data);
                    const $tagList = $('#tags_list').find('#tags-browser').children('div.s-card');
                    $tagList.each(function () {
                        getTagData('https://stackoverflow.com' + $(this).find('a:eq(0)').attr('href'));
                    });
                }).catch(err => { console.log(err.message); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { tagName } = req.body;
            if (!tagName) {
                res.status(400).json({ data: null, message: "should send tagName" });
            }
            else {
                const [result, created] = yield Tag_1.Tag.findOrCreate({
                    where: { tagName },
                    defaults: req.body
                });
                if (created) {
                    res.status(200).json({ data: null, message: "ok" });
                }
                res.status(400).json({ data: null, message: "Please check again" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { tagName } = req.body;
            if (!tagName) {
                res.status(400).json({ data: null, message: "should send full data" });
            }
            else {
                yield Tag_1.Tag.destroy({ where: { tagName } });
                res.status(200).json({ data: null, message: "delete success" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    })
};
//# sourceMappingURL=tags.js.map