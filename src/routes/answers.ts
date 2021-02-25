import { Router } from "express"
import { controller } from "../controller/answers"

export const answers = Router()

answers.get('/', controller.get)
answers.post('/', controller.post)
answers.patch('/', controller.patch)
answers.delete('/', controller.delete)

