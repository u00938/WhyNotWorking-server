import { Router } from "express"
import { controller } from "../controller/answers"
import { tokenChecker } from "../middleware/token"

export const answers = Router()

answers.get('/', controller.get)
answers.post('/', tokenChecker, controller.post)
answers.patch('/', tokenChecker, controller.patch)
answers.delete('/', tokenChecker, controller.delete)
answers.get('/toggleChoose', tokenChecker, controller.toggleChoose)
answers.get('/votesUp', tokenChecker, controller.votesUp)
answers.get('/votesDown', tokenChecker, controller.votesDown)

