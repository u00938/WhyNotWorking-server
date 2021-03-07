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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const axios_1 = __importDefault(require("axios"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.controller = {
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ data: null, message: "should send full data" });
            }
            const userInfo = yield User_1.User.findOne({ where: { email } });
            if (!userInfo) {
                res.status(400).json({ data: null, message: "no such user" });
            }
            const isSame = yield bcrypt_1.default.compare(password, userInfo.password);
            if (!isSame) {
                res.status(400).json({ data: null, message: "password don't match" });
            }
            else {
                const payload = {
                    id: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id,
                    email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email,
                    nickname: userInfo === null || userInfo === void 0 ? void 0 : userInfo.nickname
                };
                jsonwebtoken_1.default.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" }, (err, token) => {
                    if (err)
                        res.status(404).json({ data: null, message: err.message });
                    const options = {
                        //domain: "localhost",
                        path: "/",
                        httpOnly: true,
                        //secure: true,
                        //sameSite: "none",
                        maxAge: 1000 * 60 * 60 * 24,
                        overwrite: true,
                    };
                    res.cookie("accessToken", token, options);
                    res.status(200).json({ data: null, message: "ok" });
                });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    googleLogin: (req, res) => {
        let token = req.body.token;
        console.log(token);
        let userInfo = {};
        function verify() {
            return __awaiter(this, void 0, void 0, function* () {
                const ticket = yield client.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                userInfo.nickname = payload.name;
                userInfo.email = payload.email;
                userInfo.image = payload.picture;
            });
        }
        verify()
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            const { nickname, email, image } = userInfo;
            const [result, created] = yield User_1.User.findOrCreate({
                where: { email, nickname },
                defaults: { nickname, email, image },
            });
            const options = {
                //domain: "localhost",
                path: "/",
                httpOnly: true,
                //secure: true,
                //sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24,
                overwrite: true,
            };
            res.cookie("googleOauthToken", token, options);
            console.log(result);
            res.status(200).json({ data: result, message: "ok" });
        }))
            .catch(console.error);
    },
    githubLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const client_id = process.env.GITHUB_CLIENT_ID;
            const client_secret = process.env.GITHUB_CLIENT_SECRET;
            const url = 'https://github.com/login/oauth/access_token';
            const code = req.body.authorizationCode;
            if (code) {
                yield axios_1.default.post(url, { client_id, client_secret, code }, { headers: { accept: "application/json" } })
                    .then((result) => {
                    res.status(200).json({ accessToken: result.data.access_token });
                });
            }
            else {
                res.status(400).json({ data: null, message: "should send authorization code" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
};
//# sourceMappingURL=login.js.map