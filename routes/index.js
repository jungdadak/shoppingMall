import express from 'express';
import userApi from './user.api.js';
const router = express.Router();

router.use('/user', userApi);

export default router;
