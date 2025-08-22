import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' });

const isEmail = (contact) => /\S+@\S+\.\S+/.test(contact);
const isPhone = (contact) => /^\d{10}$/.test(contact);

export const register = async (req, res) => {
  const { name, contact, password, isAdmin } = req.body;

  if (!name || !contact || !password) {
    return res.status(400).json({ message: 'Name, contact, and password are required' });
  }

  let email = null, phone = null;
  if (isEmail(contact)) email = contact;
  else if (isPhone(contact)) phone = contact;
  else return res.status(400).json({ message: 'Invalid email or phone format' });

  const userExists = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, phone, password, isAdmin: !!isAdmin });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    isAdmin: user.isAdmin,
    token: genToken(user._id),
  });
};

export const login = async (req, res) => {
  const { contact, password } = req.body;

  if (!contact || !password) {
    return res.status(400).json({ message: 'Contact and password are required' });
  }

  const user = await User.findOne({ $or: [{ email: contact }, { phone: contact }] });

  if (user && await user.matchPassword(password)) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    });
  }

  res.status(401).json({ message: 'Invalid credentials' });
};
