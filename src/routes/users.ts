import { Router } from "express"
import { controller } from "../controller/users"

export const users = Router()

users.get('/', controller.get)
users.get('/:id', controller.getById)
users.post('/', controller.signUp)
users.patch('/', controller.patch)