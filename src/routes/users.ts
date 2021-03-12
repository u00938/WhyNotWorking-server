import { Router } from "express"
import { controller } from "../controller/users"
import { tokenChecker } from "../middleware/token"

export const users = Router()

users.get('/', controller.get)
users.get('/myInfo', tokenChecker, controller.getMyInfo)
users.get('/count', controller.getCount)
users.post('/', controller.signUp)
users.patch('/', tokenChecker, controller.patch)