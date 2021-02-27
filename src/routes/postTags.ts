import { Router } from "express"
import { controller } from "../controller/postTags"

export const postTags = Router();

postTags.post('/', controller.post);
postTags.delete('/', controller.delete);
