import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

(async ()=>{
  try {
    await connectDB();
    const email = 'admin@raithanna.com';
    const exists = await User.findOne({ email });
    if (exists) {
      console.log('Admin already exists:', email);
      process.exit(0);
    }
    const user = await User.create({
      name: 'Admin',
      email,
      password: 'Admin@123',
      isAdmin: true
    });
    console.log('✅ Admin created:', user.email, '(password: Admin@123)');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
