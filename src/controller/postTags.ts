import { Request, Response } from "express"
import * as sequelize from "sequelize"
import { Post } from "../models/Post";
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
  }
}