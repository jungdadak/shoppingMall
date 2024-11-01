import express from "express";
import productController from "../controllers/product.controller.js";
import authController from "../controllers/auth.controller.js";
const router = express.Router();

router.post(
	"/",
	authController.authenticate,
	authController.checkAdminPermission,
	productController.createProduct
);

router.get("/", productController.getProducts);
router.put(
	"/:id",
	authController.authenticate,
	authController.checkAdminPermission,
	productController.updateProduct
);
router.get("/:id", productController.getProductById);

export default router;
