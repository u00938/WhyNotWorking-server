import { Request, Response } from "express"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User"

export const controller = {
  post: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ data: null, message: "should send full data" })
      }
      const userInfo = await User.findOne({ where: { email } });
      if (!userInfo) {
        res.status(400).json({ data: null, message: "no such user" })
      } 
      const isSame = await bcrypt.compare(password, userInfo!.password);
      if (!isSame) {
        res.status(400).json({ data: null, message: "password don't match" })
      } else {
        jwt.sign(
          { userInfo }, 
          process.env.ACCESS_SECRET!, 
          { expiresIn: "1d" }
          , (err, token) => {
            if (err) res.status(404).json({ data: null, message: err.message })
            interface Options {
              // domain?: string,
              path: string;
              httpOnly: boolean;
              secure: boolean;
              sameSite: string;
              maxAge: number;
              overwrite: boolean;
            }
            const options: any = {
              //domain: "localhost",
              path: "/",
              httpOnly: true,
              //secure: true,
              //sameSite: "none",
              maxAge: 1000 * 60 * 60 * 24,
              overwrite: true,
            } as Options
            res.cookie("accessToken", token, options)
            res.status(200).json({ data: null, message: "ok" })
          }
          );
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}