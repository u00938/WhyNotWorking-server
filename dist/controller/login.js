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
                        // domain: "localhost",
                        path: "/",
                        httpOnly: true,
                        secure: process.env.COOKIE_SECURE || false,
                        sameSite: process.env.COOKIE_SAMESITE || "Lax",
                        maxAge: 1000 * 60 * 60 * 24,
                        overwrite: true,
                    };
                    res.cookie("accessToken", token, options);
                    res.status(200).json({ data: null, accessToken: `Bearer ${token}`, message: "ok" });
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
                where: { email },
                defaults: { nickname, email, image },
            });
            const payload = {
                id: result.id,
                email: result.email,
                nickname: result.nickname
            };
            jsonwebtoken_1.default.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" }, (err, token) => {
                if (err)
                    res.status(404).json({ data: null, message: err.message });
                const options = {
                    // domain: "localhost",
                    path: "/",
                    httpOnly: true,
                    secure: process.env.COOKIE_SECURE || false,
                    sameSite: process.env.COOKIE_SAMESITE || "Lax",
                    maxAge: 1000 * 60 * 60 * 24,
                    overwrite: true,
                };
                res.cookie("accessToken", token, options);
                res.status(200).json({ data: result, accessToken: `Bearer ${token}`, message: "ok" });
            });
        }))
            .catch(console.error);
    },
    githubToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const client_id = process.env.GITHUB_CLIENT_ID;
            const client_secret = process.env.GITHUB_CLIENT_SECRET;
            const url = 'https://github.com/login/oauth/access_token';
            const code = req.body.authorizationCode;
            if (code) {
                yield axios_1.default.post(url, { client_id, client_secret, code }, { headers: { accept: "application/json" } })
                    .then((result) => {
                    const token = result.data.access_token;
                    res.status(200).json({ data: null, accessToken: token, message: "ok" });
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
    githubLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, nickname, location, image } = req.body;
        const [result] = yield User_1.User.findOrCreate({
            where: { email: nickname + '@github.com' },
            defaults: { email: nickname + '@github.com', nickname: email, location, image },
        });
        const payload = {
            id: result.id,
            email: result.email,
            nickname: result.nickname
        };
        jsonwebtoken_1.default.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" }, (err, token) => {
            if (err)
                res.status(404).json({ data: null, message: err.message });
            const options = {
                // domain: "localhost",
                path: "/",
                httpOnly: true,
                secure: process.env.COOKIE_SECURE || false,
                sameSite: process.env.COOKIE_SAMESITE || "Lax",
                maxAge: 1000 * 60 * 60 * 24,
                overwrite: true,
            };
            res.cookie("accessToken", token, options);
            res.status(200).json({ data: null, accessToken: `Bearer ${token}`, message: "ok" });
        });
    })
    // facebookLogin: async (req: Request, res: Response) => {
    //   try {
    //     async function getAccessTokenFromCode(code:any) {
    //       const { data } = await axios({
    //         url: "https://graph.facebook.com/v10.0/oauth/access_token",
    //         method: "get",
    //         params: {
    //           client_id: "428059655088288",
    //           client_secret: "c712dcb406d3ccc0becf3bf0d971a8e1",
    //           redirect_uri: "http://localhost:3000/auth/callback",
    //           code
    //         }
    //       })
    //       return data.access_token;
    //     }
    //     const token = await getAccessTokenFromCode(req.body.code);
    //     const profile:any = await axios({
    //       url: `https://graph.facebook.com/me?fields=email,first_name,last_name&access_token=${token}`,
    //       method: "get"
    //     })
    //     const picture:any = await axios({
    //       url: `https://graph.facebook.com/me/picture?fields=url&type=large&redirect=0&access_token=${token}`,
    //       method: "get"
    //     })
    //     const [result, created] = await User.findOrCreate({
    //       where: { email: profile.data.email, nickname: profile.data.last_name+profile.data.first_name },
    //       defaults: {
    //         email: profile.email,
    //         nickname: profile.data.last_name+profile.data.first_name,
    //         image: picture.data.data.url
    //       }
    //     });
    //     interface Options {
    //       // domain?: string,
    //       path: string;
    //       httpOnly: boolean;
    //       secure: boolean;
    //       sameSite: string;
    //       maxAge: number;
    //       overwrite: boolean;
    //     }
    //     const options: any = {
    //       //domain: "localhost",
    //       path: "/",
    //       httpOnly: true,
    //       //secure: true,
    //       //sameSite: "none",
    //       maxAge: 1000 * 60 * 60 * 24,
    //       overwrite: true,
    //     } as Options
    //     res.cookie("facebookOauthToken", token, options);
    //     res.status(200).json({ data: result, message: "ok" });
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // }
};
//# sourceMappingURL=login.js.map