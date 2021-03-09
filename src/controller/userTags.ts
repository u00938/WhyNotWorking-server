import { Request, Response } from "express"
import { UserTag } from "../models/UserTag"

export const controller = {
  post: async (req: Request, res: Response) => {
    try {
    const { userId, tagId } = req.body;
    if(!userId || !tagId) {
      res.status(400).json({ data: null, message: "should send full data" })
    } else {
      for(let i = 0; i < tagId.length; i++) {
        await UserTag.findOrCreate({
          where: { userId, tagId: tagId[i] },
          defaults: { userId, tagId: tagId[i] }
        });
      }
        res.status(200).json({ data: null, message: "ok" })
    }
    } catch (err) {
      console.log(err.message)
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { userId, tagId } = req.body;
      if(!userId || !tagId) {
        res.status(400).json({ data: null, message: "should send full data" })
      } else {
        await UserTag.destroy({ where: { userId, tagId } });
        res.status(200).json({ data: null, message: "delete success" });
      }
    } catch (err) {
      console.log(err.message)
    }
  }
}