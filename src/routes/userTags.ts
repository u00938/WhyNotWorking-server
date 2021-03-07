import { Router } from "express"
import { controller } from "../controller/userTags"
import { tokenChecker } from "../middleware/token"

export const userTags = Router();

userTags.post('/', tokenChecker, controller.post);
userTags.delete('/', tokenChecker, controller.delete);
