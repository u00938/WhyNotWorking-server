import { Request, Response } from "express";
import { Post } from "../models/Post";
import { Tag } from "../models/Tag";
import { PostTag } from "../models/PostTag";
import { Answer } from "../models/Answer";
import { User } from "../models/User";

import { Op } from "sequelize";

export const controller = {
  get: async (req: Request, res: Response) => {
    try {
      const query = req.query;
      let pageNum: any = query.page;
      let offset: number = 0;
      if(pageNum > 1) {
        offset = 15 * (pageNum - 1);
      }
      const scope = async (condition: any) => {
        await Post.addScope("hasParticularTag", 
        {
          attributes: ["id"],
          include: [
            { model: Tag, 
              attributes: [],
              as: "tag",
              where: { tagName: condition }
            }
          ]
        },
        { 
          override: true 
        })
      }
      if (query.tag) {
        scope(query.tag)
        const postByTag = await Post.findAll({
          include: [
            {
              model: Post.scope("hasParticularTag"),
              required: true,
              as: "post",
              attributes: []
            },
            { model: User, attributes: ["nickname", "image"] },
            { model: PostTag, attributes: ["tagId"], 
              include: [{
                model: Tag,
                attributes: ["tagName"],
              }]
            },
            { model: Answer, 
              attributes: ["body", "votes", "choose"], 
              include: [{ 
                model: User, 
                attributes: ["nickname", "image"] 
              }] 
            },
          ],
          offset,
          limit: 15
        })
        const tagDetail = await Tag.findOne({ where: { tagName: query.tag } })
        res.status(200).json({ data: { tagDetail, postByTag }, message: "ok" })
      }
      if (query.answers === "0") {

      }
      if (query.user) {

      }
      if (query.score) {

      }
      if (query.word) {

      }
      if (query.isaccepted) {

      }
      if (query.q) {
        const isTagName = await Tag.findOne({ where: { tagName: query.q } })
        if (isTagName) {
          scope(query.q)
          const postByTag = await Post.findAll({
            include: [
              {
                model: Post.scope("hasParticularTag"),
                required: true,
                as: "post",
                attributes: []
              },
              { model: User, attributes: ["nickname", "image"] },
              { model: PostTag, attributes: ["tagId"], 
                include: [{
                  model: Tag,
                  attributes: ["tagName"],
                }]
              },
              { model: Answer, 
                attributes: ["body", "votes", "choose"], 
                include: [{ 
                  model: User, 
                  attributes: ["nickname", "image"] 
                }] 
              },
            ],
            offset,
            limit: 15
          })
          res.status(200).json({ data: { isTagName, postByTag }, message: "ok" })
        } else {
          const postLike = await Post.findAll({
            include: [
              { model: User, attributes: ["nickname", "image"] },
              { model: PostTag, attributes: ["tagId"], 
                include: [{
                  model: Tag,
                  attributes: ["tagName"],
                }]
              },
              { model: Answer, 
                attributes: ["body", "votes", "choose"], 
                include: [{ 
                  model: User, 
                  attributes: ["nickname", "image"] 
                }] 
              },
            ],
            where: {
              body: {
                [Op.like]: "%" + query.q + "%"
              }
            },
            offset,
            limit: 15
          })
          res.status(200).json({ data: { postLike }, message: "ok" })
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}