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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.controller = {
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.cookies.accessToken) {
                jsonwebtoken_1.default.verify(req.cookies.accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
                    if (err)
                        res.status(400).json({ data: null, message: err.message });
                    if (decoded) {
                        res.clearCookie("accessToken", {
                            //domain: "localhost",
                            path: "/",
                            httpOnly: true,
                            secure: process.env.COOKIE_SECURE,
                            sameSite: process.env.COOKIE_SAMESITE,
                            maxAge: 1000 * 60 * 60 * 24,
                            overwrite: true,
                        });
                        res.status(200).json({ data: null, message: "ok" });
                    }
                });
            }
            else if (req.cookies.googleOauthToken) {
                const ticket = yield client.verifyIdToken({
                    idToken: req.cookies.googleOauthToken,
                    audience: process.env.GOOGLE_CLIENT_ID
                });
                const payload = ticket.getPayload();
                if (payload) {
                    const options = {
                        //domain: "localhost",
                        path: "/",
                        httpOnly: true,
                        secure: process.env.COOKIE_SECURE || false,
                        sameSite: process.env.COOKIE_SAMESITE || "Lax",
                        maxAge: 1000 * 60 * 60 * 24,
                        overwrite: true,
                    };
                    res.clearCookie('googleOauthToken', options);
                    res.status(200).json({ data: null, message: 'ok' });
                }
            }
            else {
                res.status(400).json({ data: null, message: 'Please login first' });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    })
};
//# sourceMappingURL=logout.js.map