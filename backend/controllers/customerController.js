import Customer from '../models/Customer.js';

export const getCustomers = async (req, res) => {
  const customers = await Customer.find().populate('purchaseHistory.productId');
  res.json(customers);
};

export const addCustomer = async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.status(201).json(customer);
};
