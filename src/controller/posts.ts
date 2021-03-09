import { Request, Response } from "express";
import Sequelize from "sequelize";
import { Post } from "../models/Post";
import { Tag } from "../models/Tag";
import { PostTag } from "../models/PostTag";
import { Answer } from "../models/Answer";
import { User } from "../models/User";

export const controller = {
  get: async (req: Request, res: Response) => {
    try {
      const query = req.query;
      if(query.page) {
        let pageNum: any = query.page;
        let offset: number = 0;
        if(pageNum > 1) {
          offset = 15 * (pageNum - 1);
        }
        const postByPage = await Post.findAll({
          include: [
            { model: User, attributes: ["nickname", "image"] },
            { model: PostTag, attributes: ["tagId"], 
              include: [{
                model: Tag,
                attributes: ["tagName"]
              }]
            },
            { model: Answer, 
              include: [{ 
                model: User, 
                attributes: ["nickname", "image"] 
              }] 
            },
          ],
          offset,
          limit: 15
        })
        res.status(200).json({ data: postByPage, message: "ok" });
      }
      if (query.user_id) {
        const postByUser = await Post.findAll({
          include: [
            { model: User, attributes: ["nickname", "image"] },
            { model: PostTag, attributes: ["tagId"], 
              include: [{
                model: Tag,
                attributes: ["tagName"]
              }]
            },
            { model: Answer, 
              include: [{ 
                model: User, 
                attributes: ["nickname", "image"] 
              }] 
            },
          ],
          where: { userId: query.user_id }
        })
        res.status(200).json({ data: postByUser, message: "ok" })
      }
      if (query.post_id) {
        const postById = await Post.findAll({
          include: [
            { model: User, attributes: ["nickname", "image"] },
            { model: PostTag, attributes: ["tagId"], 
              include: [{
                model: Tag,
                attributes: ["tagName"]
              }]
            },
            { model: Answer, 
              include: [{ 
                model: User, 
                attributes: ["nickname", "image"] 
              }] 
            },
          ],
          where: { id: query.post_id }
        })
        res.status(200).json({ data: postById, message: "ok" })
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  getCount: async (req: Request, res: Response) => {
    try {
      const data = await Post.findAll({
        attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "count"]]
      })
      res.status(200).json({ data: data, message: "ok" });   
    } catch (err) {
      console.log(err.message);
    }
  },
  getTitle: async (req: Request, res: Response) => {
    try {
      const postTitle = await Post.findAll({
        attributes: ["id", "title"]
      })
      res.status(200).json({ data: postTitle, message: "ok" });
    } catch (err) {
      console.log(err.message);
    }
  },
  post: async (req: Request, res: Response) => {
    try {
      const { userId, title, body } = req.body;
      if (userId && title && body) {
        await Post.create({ userId, title, body });
        res.status(200).json({ data: null, message: "ok" })
      } else {
        res.status(400).json({ data: null, message: "should send full data" })
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  patch: async (req: Request, res: Response) => {
    try {
      const { id, title, body } = req.body;
      if (id && title && body) {
        await Post.update({ title, body }, { where: { id } });
        res.status(200).json({ data: null, message: "ok" })
      } else {
        res.status(400).json({ data: null, message: "should send full data" })
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      if (id) {
        await Post.destroy({ where: { id } });
        res.status(200).json({ data: null, message: "ok" });
      } else {
        res.status(400).json({ data: null, message: "should send id" });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  viewsUp: async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      if (id) {
        const findPost = await Post.findOne({ where: { id } });
        const postViews = findPost!.views;
        await Post.update({ views: postViews + 1 }, { where: { id } })
        res.status(200).json({ data: null, message: "ok" });
      } else {
        res.status(400).json({ data: null, message: "should send id" });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  votesUp: async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      if (id) {
        const findPost = await Post.findOne({ where: { id } });
        const postVotes = findPost!.votes;
        await Post.update({ votes: postVotes + 1 }, { where: { id } })
        res.status(200).json({ data: null, message: "ok" });
      } else {
        res.status(400).json({ data: null, message: "should send id" });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  votesDown: async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      if (id) {
        const findPost = await Post.findOne({ where: { id } });
        const postVotes = findPost!.votes;
        await Post.update({ votes: postVotes - 1 }, { where: { id } });
        res.status(200).json({ data: null, message: "ok" });
      } else {
        res.status(400).json({ data: null, message: "should send id" });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
}