import express from "express";
import authController from "../controllers/auth.controller.js";
import cartController from "../controllers/cart.controller.js";
const router = express.Router();

router.post("/", authController.authenticate, cartController.addItemToCart);

export default router;
