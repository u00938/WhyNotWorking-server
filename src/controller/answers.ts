import { Request, Response } from "express";
import { Answer } from "../models/Answer";
import { Post } from "../models/Post";
import jwt from "jsonwebtoken";

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
          include: [ 
            { model: Post, attributes: ["title"] } 
          ],
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
      const { id } = req.query;
      if (id) {
        const findAnswer = await Answer.findOne({ where: { id } });
        const isChoose = findAnswer!.choose;
        await Answer.update({ choose: !isChoose }, { where:  { id } });
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
      const { id } = req.query;
      if (id) {
        const authorization:any = req.headers['authorization'];
        const token = authorization.split(' ')[1];
          jwt.verify(token, process.env.ACCESS_SECRET!, async (error: any, result: any) => {
            const findPost = await Answer.findOne({ where: { id } });
            let voteUpUser = findPost!.voteUpUser;
            let voteUpArr: string[] = voteUpUser.split(" ");
            let upIndex = voteUpArr.indexOf(result.id.toString()); 
            let voteDownUser = findPost!.voteDownUser;
            let voteDownArr: string[] = voteDownUser.split(" ");
            let downIndex = voteDownArr.indexOf(result.id.toString());
            if(downIndex !== -1 && upIndex === -1) {
              voteDownArr.splice(downIndex, 1);
              voteDownUser = voteDownArr.join(" ");
              const postVotes = findPost!.votes;
              await Answer.update({ voteDownUser, votes: postVotes + 1 }, { where: { id } })
              res.status(200).json({ data: null, message: "ok" });
            } else if(downIndex === -1 && upIndex === -1) {
              voteUpArr.push(result.id.toString());
              voteUpUser = voteUpArr.join(" ");
              const postVotes = findPost!.votes;
              await Answer.update({ voteUpUser, votes: postVotes + 1 }, { where: { id } })
              res.status(200).json({ data: null, message: "ok" });
            } else {
              res.status(400).json({ data: null, message: "You have already voted" })
            }
          });
      } else {
        res.status(400).json({ data: null, message: "should send full data" });
      }
    } catch(err) {
      console.log(err.message);
    }
  },
  votesDown: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (id) {
        const authorization:any = req.headers['authorization'];
        const token = authorization.split(' ')[1];
          jwt.verify(token, process.env.ACCESS_SECRET!, async (error: any, result: any) => {
            const findPost = await Answer.findOne({ where: { id } });
            let voteUpUser = findPost!.voteUpUser;
            let voteUpArr: string[] = voteUpUser.split(" ");
            let upIndex = voteUpArr.indexOf(result.id.toString()); 
            let voteDownUser = findPost!.voteDownUser;
            let voteDownArr: string[] = voteDownUser.split(" ");
            let downIndex = voteDownArr.indexOf(result.id.toString());
            if(upIndex !== -1 && downIndex === -1) {
              voteUpArr.splice(downIndex, 1);
              voteUpUser = voteUpArr.join(" ");
              const postVotes = findPost!.votes;
              await Answer.update({ voteUpUser, votes: postVotes - 1 }, { where: { id } })
              res.status(200).json({ data: null, message: "ok" });
            } else if(upIndex === -1 && downIndex === -1) {
              voteDownArr.push(result.id.toString());
              voteDownUser = voteDownArr.join(" ");
              const postVotes = findPost!.votes;
              await Answer.update({ voteDownUser, votes: postVotes - 1 }, { where: { id } })
              res.status(200).json({ data: null, message: "ok" });
            } else {
              res.status(400).json({ data: null, message: "You have already voted" })
            }
          });
      } else {
        res.status(400).json({ data: null, message: "should send full data" });
      }
    } catch(err) {
      console.log(err.message);
    }
  }
}