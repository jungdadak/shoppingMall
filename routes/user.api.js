import express from "express";
import userController from "../controllers/user.controller.js";
import authController from "../controllers/auth.controller.js";
const router = express.Router();
//회원가입
router.post("/", userController.createUser);
router.get("/me", authController.authenticate, userController.getUser); //토큰이 valid한지, token으로 유저를 찾아서 리턴
export default router;
