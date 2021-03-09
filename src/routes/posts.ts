import { Router } from "express"
import { controller } from "../controller/posts"
import { tokenChecker } from "../middleware/token"

export const posts = Router()

posts.get('/', tokenChecker, controller.get)
posts.get('/count', tokenChecker, controller.getCount)
posts.get('/title', tokenChecker, controller.getTitle)
posts.post('/', tokenChecker, controller.post)
posts.patch('/', tokenChecker, controller.patch)
posts.delete('/', tokenChecker, controller.delete)
posts.patch('/viewsUp', tokenChecker, controller.viewsUp)
posts.patch('/votesUp', tokenChecker, controller.votesUp)
posts.patch('/votesDown', tokenChecker, controller.votesDown)