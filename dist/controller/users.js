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
const User_1 = require("../models/User");
const Tag_1 = require("../models/Tag");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = __importDefault(require("sequelize"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.controller = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.query.page) {
                let pageNum = req.query.page;
                let offset = 0;
                if (pageNum > 1) {
                    offset = 36 * (pageNum - 1);
                }
                const data = yield User_1.User.findAll({
                    attributes: ["id", "nickname", "email", "image", "location"],
                    offset,
                    limit: 36
                });
                res.status(200).json({ data: data, message: "ok" });
            }
            else if (req.query.user_id) {
                const data = yield User_1.User.findOne({
                    attributes: ["id", "nickname", "email", "image", "aboutMe", "location"],
                    include: [{
                            model: Tag_1.Tag,
                            through: { attributes: [] }
                        }],
                    where: { id: req.query.user_id }
                });
                res.status(200).json({ data: data, message: "ok" });
            }
            else {
                if (req.cookies.accessToken) {
                    const token = req.cookies.accessToken;
                    jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                        const data = yield User_1.User.findOne({
                            attributes: ["id", "nickname", "email", "image", "aboutMe", "location"],
                            include: [{
                                    model: Tag_1.Tag,
                                    through: { attributes: [] }
                                }],
                            where: { id: result.id }
                        });
                        res.status(200).json({ data: data, message: "ok" });
                    }));
                }
                else if (req.cookies.googleOauthToken) {
                    const token = req.cookies.googleOauthToken;
                    const ticket = yield client.verifyIdToken({
                        idToken: token,
                        audience: process.env.GOOGLE_CLIENT_ID
                    });
                    const payload = ticket.getPayload();
                    const myInfo = yield User_1.User.findOne({
                        where: { nickname: payload.name },
                        attributes: { exclude: ["password"] },
                        include: [{
                                model: Tag_1.Tag,
                                through: { attributes: [] }
                            }]
                    });
                    if (myInfo) {
                        res.status(200).json({ data: myInfo, message: "ok" });
                    }
                }
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    getCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield User_1.User.findAll({
                attributes: [[sequelize_1.default.fn("COUNT", sequelize_1.default.col("id")), "count"]]
            });
            res.status(200).json({ data: data, message: "ok" });
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password, nickname, location, aboutMe } = req.body;
            const sameEmail = yield User_1.User.findOne({ where: { email } });
            const sameNickname = yield User_1.User.findOne({ where: { nickname } });
            if (sameEmail) {
                res.status(400).json({ data: null, message: "Such email already exists" });
            }
            else if (sameNickname) {
                res.status(400).json({ data: null, message: "Such nickname already exists" });
            }
            else {
                const salt = yield bcrypt_1.default.genSalt();
                const $password = yield bcrypt_1.default.hash(password, salt);
                if (!email || !password || !nickname) {
                    res.status(400).json({ data: null, message: "should send full data" });
                }
                else {
                    yield User_1.User.create({ email, password: $password, nickname, location, aboutMe });
                    res.status(200).json({ data: null, message: "ok" });
                }
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    patch: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.cookies.accessToken;
            jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                const { nickname, password, image, aboutMe, location } = req.body;
                // password가 있는 경우
                if (password) {
                    const salt = yield bcrypt_1.default.genSalt();
                    const $password = yield bcrypt_1.default.hash(password, salt);
                    // nickname이 들어오면 중복 검증
                    if (nickname) {
                        const sameNickname = yield User_1.User.findOne({ where: { nickname } });
                        if (sameNickname) {
                            res.status(400).json({ data: null, message: "Such nickname already exists" });
                        }
                        else {
                            yield User_1.User.update({ nickname, password: $password, image, aboutMe, location }, { where: { id: result.userInfo.id } });
                            res.status(200).json({ data: null, message: "ok" });
                        }
                    }
                    // nickname이 안들어올 경우
                    yield User_1.User.update({ password: $password, image, aboutMe, location }, { where: { id: result.userInfo.id } });
                    res.status(200).json({ data: null, message: "ok" });
                }
                // password가 없는 경우
                else {
                    // nickname이 들어오면 중복 검증
                    if (nickname) {
                        const sameNickname = yield User_1.User.findOne({ where: { nickname } });
                        if (sameNickname) {
                            res.status(400).json({ data: null, message: "Such nickname already exists" });
                        }
                        else {
                            // nickname이 안들어올 경우
                            yield User_1.User.update({ nickname, image, aboutMe, location }, { where: { id: result.userInfo.id } });
                            res.status(200).json({ data: null, message: "ok" });
                        }
                    }
                    else {
                        yield User_1.User.update({ image, aboutMe, location }, { where: { id: result.userInfo.id } });
                        res.status(200).json({ data: null, message: "ok" });
                    }
                }
            }));
        }
        catch (err) {
            console.log(err.message);
        }
    })
};
//# sourceMappingURL=users.js.map