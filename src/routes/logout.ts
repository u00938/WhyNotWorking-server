import { Router } from "express"
import { controller } from "../controller/logout"

export const logout = Router();

logout.post('/', controller.post);