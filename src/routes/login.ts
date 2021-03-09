import { Router } from "express"
import { controller } from "../controller/login"

export const login = Router();

login.post('/', controller.post);
login.post('/googleLogin', controller.googleLogin);
login.post('/githubLogin', controller.githubLogin);
//login.post('/facebookLogin', controller.facebookLogin);