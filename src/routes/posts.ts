import { Router } from "express"
import { controller } from "../controller/posts"

export const posts = Router()

posts.get('/', controller.get)
posts.post('/', controller.post)
posts.patch('/', controller.patch)
posts.delete('/', controller.delete)