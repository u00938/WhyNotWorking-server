import { Router } from "express"
import { controller } from "../controller/users"
import { tokenChecker } from "../middleware/token"

export const users = Router()

users.get('/', tokenChecker, controller.get)
users.get('/count', tokenChecker, controller.getCount)
users.post('/', controller.signUp)
users.patch('/', tokenChecker, controller.patch)