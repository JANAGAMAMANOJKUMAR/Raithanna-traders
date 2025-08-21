import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import path from 'path';
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.send('Raithanna Traders API running'));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// basic error handler
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API on http://localhost:${PORT}`));

const __dirname = path.resolve(); 
app.use('/images', express.static(path.join(__dirname, '/public/images')));