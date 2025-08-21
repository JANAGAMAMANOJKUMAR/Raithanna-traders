import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  if (!orderItems?.length) return res.status(400).json({ message: 'No items' });

  let itemsPrice = 0;
  for (const item of orderItems) {
    const p = await Product.findById(item.product);
    if (!p) return res.status(400).json({ message: `Product not found: ${item.product}` });
    if (p.countInStock < item.qty) return res.status(400).json({ message: `Out of stock: ${p.name}` });
    itemsPrice += p.price * item.qty;
  }
  const shippingPrice = itemsPrice > 999 ? 0 : 49;
  const totalPrice = itemsPrice + shippingPrice;

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod: paymentMethod || 'COD',
    itemsPrice,
    shippingPrice,
    totalPrice
  });

  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.product, { $inc: { countInStock: -item.qty } });
  }

  res.status(201).json(order);
};

export const myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

export const listOrders = async (_req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
};
