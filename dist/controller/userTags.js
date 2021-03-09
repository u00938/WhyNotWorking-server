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
const UserTag_1 = require("../models/UserTag");
exports.controller = {
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, tagId } = req.body;
            if (!userId || !tagId) {
                res.status(400).json({ data: null, message: "should send full data" });
            }
            else {
                for (let i = 0; i < tagId.length; i++) {
                    yield UserTag_1.UserTag.findOrCreate({
                        where: { userId, tagId: tagId[i] },
                        defaults: { userId, tagId: tagId[i] }
                    });
                }
                res.status(200).json({ data: null, message: "ok" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, tagId } = req.body;
            if (!userId || !tagId) {
                res.status(400).json({ data: null, message: "should send full data" });
            }
            else {
                yield UserTag_1.UserTag.destroy({ where: { userId, tagId } });
                res.status(200).json({ data: null, message: "delete success" });
            }
        }
        catch (err) {
            console.log(err.message);
        }
    })
};
//# sourceMappingURL=userTags.js.map