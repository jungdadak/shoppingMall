import Product from "../models/Product.js";
const productController = {};

productController.createProduct = async (req, res) => {
	try {
		const { sku, stock, status, name, price, description, category, image } =
			req.body;
		const product = new Product({
			sku,
			stock,
			status,
			name,
			price,
			description,
			category,
			image,
		});

		await product.save();
		res.status(201).json({ status: "success", product });
	} catch (err) {
		res.status(400).json({ status: "fail", err: err.message });
	}
};

productController.getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ status: "success", products });
	} catch (err) {
		res.status(400).json({ status: "fail", err: err.message });
	}
};
export default productController;
