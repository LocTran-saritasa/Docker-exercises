import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

router.get('/all', userController.getAllUser)

export const userRoute = router;
