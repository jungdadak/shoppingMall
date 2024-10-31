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
		const { page, name } = req.query;
		const cond = name ? { name: { $regex: name, $options: "i" } } : {};
		let query = Product.find(cond);

		const productList = await query.exec();

		res.status(200).json({ status: "success", productList });
	} catch (err) {
		res.status(400).json({ status: "fail", err: err.message });
	}
};
export default productController;
