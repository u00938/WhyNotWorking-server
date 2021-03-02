import { Request, Response } from "express"
import { User } from "../models/User"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const controller = {
  get: async (req: Request, res: Response) => {
    try {
      if(req.query.page) {
        let pageNum: any = req.query.page;
        let offset: number = 0;
        if(pageNum > 1) {
          offset = 2 * (pageNum - 1);
        }
        const data = await User.findAll({
          attributes: ["id", "nickname", "email", "image"],
          offset,
          limit: 2
        })
        res.status(200).json({ data: data, message: "ok" });
      } else if(req.query.user_id) {
        const data = await User.findOne({ 
          attributes: ["id", "nickname", "email", "image"],
          where: { id: req.query.user_id }
        })
        res.status(200).json({ data: data, message: "ok" });
      } else {
        res.status(400).json({ data: null, message: "Please check again" });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  signUp: async (req: Request, res: Response) => {
    try {
      const { email, password, nickname } = req.body;
      const sameEmail = await User.findOne({ where: { email } });
      const sameNickname = await User.findOne({ where: { nickname } });

      if (sameEmail) {
        res.status(400).json({ data: null, message: "Such email already exists" });
      } else if (sameNickname) {
        res.status(400).json({ data: null, message: "Such nickname already exists" });
      } else {
        const salt = await bcrypt.genSalt();
        const $password = await bcrypt.hash(password, salt);
        if (!email || !password || !nickname) {
          res.status(400).json({ data: null, message: "should send full data" });
        } else {
          await User.create({ email, password: $password, nickname  });
          res.status(200).json({ data: null, message: "ok" });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  patch: async (req: Request, res: Response) => {
    try {
      const token = req.cookies.accessToken;
      jwt.verify(token, process.env.ACCESS_SECRET!, async (error: any, result: any) => {
        const { nickname, password } = req.body;
        // password가 있는 경우
          if(password) {
            const salt = await bcrypt.genSalt();
            const $password = await bcrypt.hash(password, salt);
            // nickname이 들어오면 중복 검증
            if(nickname) {
              const sameNickname = await User.findOne({ where: { nickname } });
              if (sameNickname) {
                res.status(400).json({ data: null, message: "Such nickname already exists" });
              } else {
                await User.update(
                  { nickname, password: $password },
                  { where: { id: result.userInfo.id } }
                );
                res.status(200).json({ data: null, message: "ok" });
              }
            }
            // nickname이 안들어오면 비밀번호만 변경
            await User.update(
              { password: $password },
              { where: { id: result.userInfo.id } }
            );
            res.status(200).json({ data: null, message: "ok" });
        } 
        // password가 없는 경우
        else {
            const sameNickname = await User.findOne({ where: { nickname } });
            if (sameNickname) {
              res.status(400).json({ data: null, message: "Such nickname already exists" });
            } else {
              await User.update(
                { nickname },
                { where: { id : result.userInfo.id } }
              );
              res.status(200).json({ data: null, message: "ok" })
            }
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }
}