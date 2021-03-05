import { Router } from "express"
import { controller } from "../controller/tags"
import { tokenChecker } from "../middleware/token"

export const tags = Router()

tags.get('/', tokenChecker, controller.get)
tags.get('/count', tokenChecker, controller.getCount)
tags.post('/', tokenChecker, controller.post)
tags.delete('/', tokenChecker, controller.delete)