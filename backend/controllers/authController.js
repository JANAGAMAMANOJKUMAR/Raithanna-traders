import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/sendEmail.js';

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' });

export const register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already used' });
  const user = await User.create({ name, email, password, isAdmin: !!isAdmin });
  res.status(201).json({
    _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token: genToken(user._id)
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token: genToken(user._id)
    });
  }
  res.status(401).json({ message: 'Invalid credentials' });
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 30; // 30 mins
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    const message = `<p>Click this <a href="${resetUrl}">link</a> to reset your password.</p>`;

    await sendEmail({ to: user.email, subject: 'Password Reset', html: message });

    res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    console.error('Forgot Password error:', err);
    res.status(500).json({ message: 'Server error sending email' });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user)
    return res.status(400).json({ message: 'Reset link invalid or expired.' });

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json({ message: 'Password has been reset. You may now login.' });
};
