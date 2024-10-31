import Product from "../models/Product.js";
const PAGE_SIZE = 5;
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
		let query = Product.find(cond).sort({ createdAt: -1 });
		let response = { status: "success" };
		if (page) {
			query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
			//데이터수 나누기 페이지사이즈
			const totalItemNum = await Product.countDocuments(cond);
			const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
			response.totalPageNum = totalPageNum;
		}

		const productList = await query.exec();
		response.data = productList;
		res.status(200).json(response);
	} catch (err) {
		res.status(400).json({ status: "fail", err: err.message });
	}
};
export default productController;
