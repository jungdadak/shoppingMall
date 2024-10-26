import express from "express";
import authController from "../controllers/auth.controller.js";
const router = express.Router();
//회원가입
router.post("/login", authController.loginWithEmail);
export default router;
