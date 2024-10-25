import User from '../models/User.js';
import bcrypt from 'bcryptjs';
const authController = {};

authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await user.generateToken();
        return res.status(200).json({ status: 'success', user, token });
      }
    }
    throw new Error('User not found');
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};
export default authController;
