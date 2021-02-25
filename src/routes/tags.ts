import { Router } from "express"
import { controller } from "../controller/tags"

export const tags = Router()

tags.get('/', controller.get)
tags.post('/', controller.post)
tags.delete('/', controller.delete)