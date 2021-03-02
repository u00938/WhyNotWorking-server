import { Request, Response } from "express"
import { PostTag } from "../models/PostTag"

export const controller = {
  post: async (req: Request, res: Response) => {
    try {
    const { postId, tagId } = req.body;
    if(!postId || !tagId) {
      res.status(400).json({ data: null, message: "should send full data" })
    } else {
      const [result, created] = await PostTag.findOrCreate({
        where: req.body,
        defaults: req.body
      });
      if(created) {
        res.status(200).json({ data: null, message: "ok" })
      }
      res.status(400).json({ data:null, message: "Please check again" })
    }
    } catch (err) {
      console.log(err.message)
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { postId, tagId } = req.body;
      if(!postId || !tagId) {
        res.status(400).json({ data: null, message: "should send full data" })
      } else {
        await PostTag.destroy({ where: { postId, tagId } });
        res.status(200).json({ data: null, message: "delete success" });
      }
    } catch (err) {
      console.log(err.message)
    }
  }
}