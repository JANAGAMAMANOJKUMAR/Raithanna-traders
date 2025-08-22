import express from 'express';
import { register, login } from '../controllers/authController.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Password reset by email or phone — assigns raw password; pre-save hashes it
router.post('/simple-reset', async (req, res) => {
  try {
    const { contact, newPassword } = req.body;

    if (!contact || !newPassword) {
      return res.status(400).json({ message: 'Contact and new password required' });
    }

    // Find user by email or phone
    const user = await User.findOne({ $or: [{ email: contact }, { phone: contact }] });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = newPassword; // raw password assigned
    await user.save();           // hashed by pre-save hook

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;