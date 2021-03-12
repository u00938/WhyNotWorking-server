import { Router } from "express"
import { controller } from "../controller/users"
import { tokenChecker } from "../middleware/token"
import multer from "multer";
const upload = multer();

export const users = Router()

users.get('/', controller.get)
users.get('/myInfo', tokenChecker, controller.getMyInfo)
users.get('/count', controller.getCount)
users.post('/', controller.signUp)
users.patch('/', [tokenChecker,upload.single("image")], controller.patch)