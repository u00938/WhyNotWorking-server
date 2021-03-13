import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client, TokenPayload } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const controller = {
  post: async (req: Request, res: Response) => {
    try {
      if(req.cookies.accessToken) {
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
                secure: process.env.COOKIE_SECURE || false,
                sameSite: process.env.COOKIE_SAMESITE || "Lax",
                maxAge: 1000 * 60 * 60 * 24,
                overwrite: true,
              })
              res.status(200).json({ data: null, message: "ok" })
            }
        }) 
      } else {
        res.status(400).json({ data: null, message: 'Please login first' });
      }
    } catch (err) {
      console.log(err.message)
    }
  }
}