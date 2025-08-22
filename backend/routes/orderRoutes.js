import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { createOrder, myOrders, listOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, createOrder);            // User places order
router.get('/mine', protect, myOrders);            // User views own orders
router.get('/', protect, admin, listOrders);       // Admin views all orders

export default router;
