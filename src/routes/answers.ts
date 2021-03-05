import { Router } from "express"
import { controller } from "../controller/answers"
import { tokenChecker } from "../middleware/token"

export const answers = Router()

answers.get('/', tokenChecker, controller.get)
answers.post('/', tokenChecker, controller.post)
answers.patch('/', tokenChecker, controller.patch)
answers.delete('/', tokenChecker, controller.delete)
answers.patch('/toggleChoose', tokenChecker, controller.toggleChoose)
answers.patch('/votesUp', tokenChecker, controller.votesUp)
answers.patch('/votesDown', tokenChecker, controller.votesDown)

