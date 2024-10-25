import User from '../models/User.js';
import bcrypt from 'bcryptjs';
const userController = {};

userController.createUser = async (req, res) => {
  try {
    let { email, password, name, level } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error('User already exists');
    }
    const salt = await bcrypt.genSalt(10); //소금 열번
    password = await bcrypt.hash(password, salt); //소금 챡챡
    const newUser = new User({
      email,
      password,
      name,
      level: level ? level : 'customer',
    });
    await newUser.save();
    return res.status(200).json({ status: 'success', message: '환영하오' });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

export default userController;
