import express from 'express';
import userApi from './user.api.js';
import authApi from './auth.api.js';
const router = express.Router();

router.use('/user', userApi);
router.use('/auth', authApi);
export default router;
