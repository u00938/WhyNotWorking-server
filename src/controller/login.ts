import { Request, Response } from "express"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User"
import axios from "axios";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { access } from "fs";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
        const payload = {
          id: userInfo?.id,
          email: userInfo?.email,
          nickname: userInfo?.nickname
        }
        jwt.sign(
          payload, 
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
              // domain: "localhost",
              path: "/",
              httpOnly: true,
              secure: process.env.COOKIE_SECURE || false,
              sameSite: process.env.COOKIE_SAMESITE || "Lax",
              maxAge: 1000 * 60 * 60 * 24,
              overwrite: true,
            } as Options
            res.cookie("accessToken", token, options)
            res.status(200).json({ data: null, accessToken: `Bearer jwt ${token}` , message: "ok" })
          }
          );
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  googleLogin: (req: Request, res: Response) => {
    let token = req.body.token;
    console.log(token);
    let userInfo:any = {};
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload: any = ticket.getPayload();
      userInfo.nickname = payload.name;
      userInfo.email = payload.email;
      userInfo.image = payload.picture;
    }
    verify()
      .then(async () => {
        const { nickname, email, image } = userInfo;
        const [result, created] = await User.findOrCreate({
          where: { email, nickname },
          defaults: { nickname, email, image },
        });
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
          // domain: "localhost",
          path: "/",
          httpOnly: true,
          secure: process.env.COOKIE_SECURE || false,
          sameSite: process.env.COOKIE_SAMESITE || "Lax",
          maxAge: 1000 * 60 * 60 * 24,
          overwrite: true,
        } as Options
        res.cookie("googleOauthToken", token, options);
        res.status(200).json({ data: result, accessToken: `Bearer google ${token}`, message: "ok" });
      })
      .catch(console.error);
  },
  githubLogin: async (req: Request, res: Response) => {
    try {
      const client_id = process.env.GITHUB_CLIENT_ID;
      const client_secret = process.env.GITHUB_CLIENT_SECRET;
      const url = 'https://github.com/login/oauth/access_token';
      const code = req.body.authorizationCode;
      if (code) {
        await axios.post(url, { client_id, client_secret, code }, { headers: { accept: "application/json" } })
        .then((result) => {
          const token = result.data.access_token;
          const options: any = {
            // domain: "localhost",
            path: "/",
            httpOnly: true,
            secure: process.env.COOKIE_SECURE || false,
            sameSite: process.env.COOKIE_SAMESITE || "Lax",
            maxAge: 1000 * 60 * 60 * 24,
            overwrite: true,
          } 
          res.cookie("githubOauthToken", token, options);
          res.status(200).json({ data: null, accessToken: `Bearer github ${token}`, message: "ok" })
        })
      } else {
        res.status(400).json({ data: null, message: "should send authorization code" })
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  githubSign: async (req: Request, res: Response) => {
    const { email, nickname, location, image } = req.body;
    await User.findOrCreate({
      where: { email },
      defaults: { email, nickname, location, image },
    });
    res.status(200).json({ data: null, message: "ok" })
  }
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
}