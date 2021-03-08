import { Router } from "express"
import { controller } from "../controller/search"

export const search = Router();

search.get('/', controller.get);