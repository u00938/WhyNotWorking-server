import { Router } from "express"
import { controller } from "../controller/postTags"
import { tokenChecker } from "../middleware/token"

export const postTags = Router();

postTags.post('/', tokenChecker, controller.post);
postTags.delete('/', tokenChecker, controller.delete);
