import User from "../models/User.js";
import bcrypt from "bcryptjs";
const userController = {};

userController.createUser = async (req, res) => {
	try {
		let { email, password, name, level } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			throw new Error("User already exists");
		}
		const salt = await bcrypt.genSalt(10);
		password = await bcrypt.hash(password, salt);
		const newUser = new User({
			email,
			password,
			name,
			level: level ? level : "customer",
		});
		await newUser.save();
		return res.status(201).json({ status: "success", message: "환영합니다!" });
	} catch (error) {
		console.error("Error in createUser:", error);
		res.status(400).json({ status: "fail", error: error.message });
	}
};
userController.getUser = async (req, res) => {
	try {
		const { userId } = req;
		const user = await User.findById(userId);
		if (user) {
			return res.status(200).json({ status: "success", user });
		}
		throw new Error("User not found");
	} catch (error) {
		res.status(400).json({ status: "fail", error: error.message });
	}
};

export default userController;
