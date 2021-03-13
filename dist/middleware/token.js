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
exports.tokenChecker = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" }, (error, token) => {
            if (error)
                reject(error);
            else
                resolve(token);
        });
    });
};
const tokenChecker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.accessToken;
        const githubToken = req.cookies.githubOauthToken;
        if (token) {
            const payload = yield jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET);
            delete payload.iat;
            delete payload.exp;
            const newToken = yield generateToken(payload);
            const options = {
                // domain: "localhost",
                path: "/",
                httpOnly: true,
                secure: process.env.COOKIE_SECURE || false,
                sameSite: process.env.COOKIE_SAMESITE || "Lax",
                maxAge: 1000 * 60 * 60 * 24,
                overwrite: true,
            };
            res.cookie("accessToken", newToken, options);
            next();
        }
        else {
            res.status(400).json({ message: "auth error" });
        }
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.tokenChecker = tokenChecker;
//# sourceMappingURL=token.js.map