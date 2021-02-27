import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const controller = {
  post: async (req: Request, res: Response) => {
    try {
      jwt.verify(
        req.cookies.accessToken, 
        process.env.ACCESS_SECRET!,
        (err: any, decoded: any) => {
          if (err) res.status(400).json({ data: null, message: err.message })
          if (decoded) {
            res.clearCookie("accessToken", {
              //domain: "localhost",
              path: "/",
              httpOnly: true,
              //secure: true,
              //sameSite: "none",
              maxAge: 1000 * 60 * 60 * 24,
              overwrite: true,
            })
            res.status(200).json({ data: null, message: "ok" })
          }
      }) 
    } catch (err) {
      console.log(err.message)
    }
  }
}