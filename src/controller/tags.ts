import { Request, Response } from "express"
import { Sequelize } from "sequelize"
import { Tag } from "../models/Tag"
import { PostTag } from "../models/PostTag";
import { Post } from "../models/Post";

export const controller = {
  get: async (req: Request, res: Response) => {
    try {
      if(req.query.post_id) {
        const data = await Tag.findAll({
          attributes: ["id", "tagName"],
          include: [{
            model: Post,
            attributes: [],
            where: { id: req.query.post_id }
          }]
        });
        res.status(200).json({ data: data, message: "ok" });
      } else if(req.query.user_id) {
        const data = await Tag.findAll({
          attributes: ["id", "tagName", "detail"],
          include: [{
            model: Post,
            attributes: [],
            where: { userId: req.query.user_id }
          }]
        });
        res.status(200).json({ data: data, message: "ok" });
      } else if(req.query.page) {
        let pageNum: any = req.query.page;
        let offset: number = 0;
        if(pageNum > 1) {
          offset = 36 * (pageNum - 1);
        }
        const data = await Tag.findAll({
          attributes: ["id", "tagName", "detail", [Sequelize.fn("COUNT","postTags"), "postCount"]],
          include: [{
            model: PostTag,
            attributes: []
          }],
          group: ["Tag.id"],
          offset,
          limit: 36
        });
        res.status(200).json({ data: data, message: "ok" });
      }
    } catch (err) {
      console.log(err.message)
    }
  },
  getCount: async (req: Request, res: Response) => {
    try {
      const data = await Tag.findAll({
        attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "count"]]
      })
      res.status(200).json({ data: data, message: "ok" });   
    } catch (err) {
      console.log(err.message);
    }
  },
  post: async (req: Request, res: Response) => {
    try {
      const { tagName, detail } = req.body;
      if(!tagName || !detail) {
        res.status(400).json({ data: null, message: "should send full data" })
      } else {
        const [result, created] = await Tag.findOrCreate({
          where: { tagName },
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
      const { tagName } = req.body;
      if(!tagName) {
        res.status(400).json({ data: null, message: "should send full data" })
      } else {
        await Tag.destroy({ where: { tagName } });
        res.status(200).json({ data: null, message: "delete success" });
      }
      } catch (err) {
        console.log(err.message)
      }
  }
}