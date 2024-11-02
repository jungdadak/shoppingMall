const cartController = {};

cartController.addItemToCart = async (req, res) => {
	try {
		const { userId } = req;
		const { productId, size, qty } = req.body;

		// 입력값 검증
		if (!productId || !size) {
			throw new Error("상품 ID와 사이즈는 필수입니다.");
		}

		// 카트 찾기 또는 생성
		let cart = await Cart.findOne({ userId });
		if (!cart) {
			cart = new Cart({ userId });
			await cart.save();
		}

		// 중복 체크
		const existItem = cart.items.find(
			(item) =>
				item.productId.toString() === productId.toString() && item.size === size
		);

		if (existItem) {
			throw new Error("이미 카트에 상품이 있습니다.");
		}

		// 아이템 추가
		cart.items.push({ productId, size, qty: qty || 1 });
		await cart.save();

		// 명확한 응답 데이터
		res.status(200).json({
			status: "success",
			data: cart,
			cartItemQty: cart.items.length,
		});
	} catch (error) {
		console.error("Cart addition error:", error);
		res.status(400).json({
			status: "fail",
			message: error.message,
		});
	}
};

export default cartController;
