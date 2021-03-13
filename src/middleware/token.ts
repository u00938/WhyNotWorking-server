import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const generateToken = (payload: any) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.ACCESS_SECRET!,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token);
      }
    );
  });
};

interface Options {
  // domain?: string,
  path: string;
  httpOnly: boolean;
  // secure: boolean;
  // sameSite: string;
  maxAge: number;
  overwrite: boolean;
}

interface UserPayload {
  id: number
  nickname: string
  email: string
  image: string
  iat?: Date
  exp?: Date
}

export const tokenChecker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken;
    const githubToken = req.cookies.githubOauthToken;
    if (token) {
      const payload = await jwt.verify(token, process.env.ACCESS_SECRET!) as UserPayload
      delete payload.iat;
      delete payload.exp;
      const newToken = await generateToken(payload);
      const options: any = {
        // domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: process.env.COOKIE_SECURE || false,
        sameSite: process.env.COOKIE_SAMESITE || "Lax",
        maxAge: 1000 * 60 * 60 * 24,
        overwrite: true,
      } as Options
      res.cookie("accessToken", newToken, options)
      next()
    } else {
      res.status(400).json({ message: "auth error" })
    }
  } catch (err) {
    console.log(err.message);
  }
}