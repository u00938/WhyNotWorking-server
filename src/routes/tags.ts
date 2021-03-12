import { Router } from "express"
import { controller } from "../controller/tags"
import { tokenChecker } from "../middleware/token"

export const tags = Router()

tags.get('/', controller.get)
tags.get('/allTags', controller.getAllTags)
tags.get('/count', controller.getCount)
tags.get('/getTags', controller.getTags)
tags.post('/', tokenChecker, controller.post)
tags.delete('/', tokenChecker, controller.delete)