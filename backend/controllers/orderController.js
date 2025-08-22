import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Create new order
export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, paymentResult } = req.body;

  if (!orderItems?.length) {
    return res.status(400).json({ message: 'No items' });
  }

  let itemsPrice = 0;
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) return res.status(400).json({ message: `Product not found: ${item.product}` });
    if (product.countInStock < item.qty) return res.status(400).json({ message: `Out of stock: ${product.name}` });

    itemsPrice += product.price * item.qty;
  }

  const shippingPrice = itemsPrice > 999 ? 0 : 49;
  const totalPrice = itemsPrice + shippingPrice;

  const orderData = {
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod: paymentMethod || 'COD',
    paymentResult: paymentResult || null,
    itemsPrice,
    shippingPrice,
    totalPrice,
    isPaid: paymentMethod !== 'COD' && paymentResult?.status === 'COMPLETED',
    paidAt: paymentResult?.update_time ? new Date(paymentResult.update_time) : null,
  };

  const order = await Order.create(orderData);

  // Update stock for each product
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.product, { $inc: { countInStock: -item.qty } });
  }

  res.status(201).json(order);
};

// Get orders for logged in user
export const myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

// Admin: Get all orders
export const listOrders = async (_req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
};
