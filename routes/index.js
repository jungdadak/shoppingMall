import express from "express";
import userApi from "./user.api.js";
import authApi from "./auth.api.js";
import productApi from "./product.api.js";
import cartApi from "./cart.api.js";
const router = express.Router();

router.use("/user", userApi);
router.use("/auth", authApi);
router.use("/product", productApi);
router.use("/cart", cartApi);
export default router;
