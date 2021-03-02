import { Router } from "express"
import { controller } from "../controller/users"

export const users = Router()

users.get('/', controller.get)
users.post('/', controller.signUp)
users.patch('/', controller.patch)