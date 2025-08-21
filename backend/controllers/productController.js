import Product from '../models/Product.js';

export const listProducts = async (req, res) => {
  const { q = '', category = '' } = req.query;
  const filter = {
    ...(q ? { name: { $regex: q, $options: 'i' } } : {}),
    ...(category ? { category } : {})
  };
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
};

export const getProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Product not found' });
  res.json(p);
};

export const createProduct = async (req, res) => {
  const p = await Product.create(req.body);
  res.status(201).json(p);
};

export const updateProduct = async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!p) return res.status(404).json({ message: 'Product not found' });
  res.json(p);
};

export const deleteProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Product not found' });
  await p.deleteOne();
  res.json({ message: 'Deleted' });
};
