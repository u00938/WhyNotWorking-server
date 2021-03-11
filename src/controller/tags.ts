import { Request, Response } from "express"
import { Sequelize } from "sequelize"
import { Tag } from "../models/Tag"
import { PostTag } from "../models/PostTag";
import { Post } from "../models/Post";
import axios from "axios";
import cheerio from "cheerio";

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
      } else if(req.query.tagName) {
        const data = await Tag.findOne({
          where: { tagName: req.query.tagName }
        });
        res.status(200).json({ data: data, message: "ok" });
      } else if(req.query.page) {
        let pageNum: any = req.query.page;
        let offset: number = 0;
        if(pageNum > 1) {
          offset = 36 * (pageNum - 1);
        }
        const data = await Tag.findAll({
          attributes: ["id", "tagName", "detail", [Sequelize.fn("COUNT", "postTag.id"), "postCount"]],
          include: [{
            model: PostTag,
            as: "postTag",
            attributes: [],
            duplicating: false
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
  getAllTags: async (req: Request, res: Response) => {
    try {
      const data = await Tag.findAll()
      res.status(200).json({ data, message: "ok" });
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
  getTags: async (req: Request, res: Response) => {
    try {
      function getTagData (url:any) {
          axios.get(url).then(res => {
            const $ = cheerio.load(res.data);
            const $tagData = $('#mainbar');
              Tag.create({
                tagName: $tagData.find("h1").text().replace("Questions tagged ", "").replace("[", "").replace("]", "").replace("\n", "").replace("        ", ""),
                detail: $tagData.find("p").text().replace("\n", "").replace("                    ", "")
              })
          })
        }
        for(let i = 1; i < 7; i++) {
          axios.get(`https://stackoverflow.com/tags?page=${i}&tab=popular`).then(res => {
            const $ = cheerio.load(res.data);
            const $tagList = $('#tags_list').find('#tags-browser').children('div.s-card');
            $tagList.each(function (this: any) {
              getTagData('https://stackoverflow.com' + $(this).find('a:eq(0)').attr('href'))
            })
          }).catch(err => {console.log(err.message)});
        }
    } catch (err) {
      console.log(err.message);
    }
  },
  post: async (req: Request, res: Response) => {
    try {
      const { tagName, detail } = req.body;
      if(!tagName) {
        res.status(400).json({ data: null, message: "should send tagName" })
      } else {
        const tagNum = []; 
        if(detail) {
          for(let i = 0; i < tagName.length; i++) {
            const [result, created] = await Tag.findOrCreate({
              where: { tagName: tagName[i], detail: detail[i] },
              defaults: { tagName: tagName[i], detail: detail[i] }
            });
            tagNum.push(result.id);
          }
        } else {
          for(let i = 0; i < tagName.length; i++) {
            const [result, created] = await Tag.findOrCreate({
              where: { tagName: tagName[i] },
              defaults: { tagName: tagName[i] }
            });
            tagNum.push(result.id);
          }
        }
        res.status(200).json({ data: tagNum, message: "ok" })
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