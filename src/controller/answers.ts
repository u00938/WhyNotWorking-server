import { Request, Response } from "express"
import * as sequelize from "sequelize"
import { Answer } from "../models/Answer"

export const controller = {
  get: async (req: Request, res: Response) => {
    try {
      const query = req.query;
      if (query.post_id) {
        const answerByPostId = await Answer.findAll({
          where: { postId: query.post_id }
        });
        if (answerByPostId) res.status(200).json({ data: answerByPostId, message: "ok" });
        else res.status(400).json({ data: null, message: "no answer" });
      }
      if (query.user_id) {
        const answerByUserId = await Answer.findAll({
          where: { userId: query.user_id }
        });
        if (answerByUserId) res.status(200).json({ data: answerByUserId, message: "ok" });
        else res.status(400).json({ data: null, message: "no answer" });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  post: async (req: Request, res: Response) => {
    try {
      const { postId, userId, body } = req.body;
      if (postId && userId && body) {
        await Answer.create({ postId, userId, body });
        res.status(200).json({ data: null, message: "ok" });
      } else {
        res.status(400).json({ data: null, message: "should send full data" });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  patch: async (req: Request, res: Response) => {
    try {
      const { id, body } = req.body;
      if (id && body) {
        await Answer.update(
          { id, body },
          { where: { id } }
        );
        res.status(200).json({ data: null, message: "ok" });
      } else {
        res.status(400).json({ data: null, message: "should send full data" });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      if (id) {
        await Answer.destroy({ where: { id } });
        res.status(200).json({ data: null, message: "ok" });
      } else {
        res.status(400).json({ data: null, message: "should send id" });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  toggleChoose: async (req: Request, res: Response) => {
    try {
      const { id, choose } = req.body;
      if (id && choose !== undefined) {
        await Answer.update({ choose: !choose }, { where:  { id } });
        res.status(200).json({ data: null, message: "ok" });
      } else {
        res.status(400).json({ data: null, message: "should send full data" });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  votesUp: async (req: Request, res: Response) => {
    try {
      const { id, votes } = req.body;
      if (id && votes !== undefined) {
        await Answer.update({ votes: votes + 1 }, { where: { id }});
        res.status(200).json({ data: null, message: "ok" });
      } else {
        res.status(400).json({ data: null, message: "should send full data" });
      }
    } catch(err) {
      console.log(err.message);
    }
  },
  votesDown: async (req: Request, res: Response) => {
    try {
      const { id, votes } = req.body;
      if (id) {
        if (votes === 0) {
          res.status(400).json({ data: null, message: "votes cannot be negative" })
        } else if (votes > 0) {
          await Answer.update({ votes: votes - 1 }, { where: { id }});
          res.status(200).json({ data: null, message: "ok" });
        }
      } else {
        res.status(400).json({ data: null, message: "should send full data" });
      }
    } catch(err) {
      console.log(err.message);
    }
  }
}