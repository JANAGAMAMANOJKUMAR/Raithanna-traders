import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { createOrder, myOrders, listOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/mine', protect, myOrders);
router.get('/', protect, admin, listOrders);

export default router;
