import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const authController = {};

authController.loginWithEmail = async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email });
		if (user) {
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				const token = await user.generateToken();
				return res.status(200).json({ status: "success", user, token });
			}
		}
		throw new Error("ID나 PW가 틀렸습니다.");
	} catch (error) {
		res.status(400).json({ status: "fail", error: error.message });
	}
};

authController.authenticate = async (req, res, next) => {
	try {
		const tokenString = req.headers.authorization;
		if (!tokenString) {
			throw new Error("토큰 형식이 유효하지 않습니다.");
		}
		const token = tokenString.replace("Bearer ", "");
		jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
			if (error) {
				throw new Error("유효하지 않은 세션입니다.");
			}
			req.userId = payload._id;
		});
		next();
	} catch (error) {
		res.status(400).json({ status: "fail", error: error.message });
	}
};
export default authController;
