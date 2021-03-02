import { Router } from "express"
import { controller } from "../controller/posts"

export const posts = Router()

posts.get('/', controller.get)
posts.post('/', controller.post)
posts.patch('/', controller.patch)
posts.delete('/', controller.delete)
posts.patch('/viewsUp', controller.viewsUp)
posts.patch('/votesUp', controller.votesUp)
posts.patch('/votesDown', controller.votesDown)