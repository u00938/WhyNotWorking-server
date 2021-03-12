import { Router } from "express"
import { controller } from "../controller/posts"
import { tokenChecker } from "../middleware/token"

export const posts = Router()

posts.get('/', controller.get)
posts.get('/count', controller.getCount)
posts.get('/title', controller.getTitle)
posts.post('/', tokenChecker, controller.post)
posts.patch('/', tokenChecker, controller.patch)
posts.delete('/', tokenChecker, controller.delete)
posts.get('/viewsUp', tokenChecker, controller.viewsUp)
posts.get('/votesUp', tokenChecker, controller.votesUp)
posts.get('/votesDown', tokenChecker, controller.votesDown)