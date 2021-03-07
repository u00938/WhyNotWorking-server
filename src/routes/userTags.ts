import { Router } from "express"
import { controller } from "../controller/userTags"

export const userTags = Router();

userTags.post('/', controller.post);
userTags.delete('/', controller.delete);
