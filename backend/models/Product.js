import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    category: { type: String, index: true },
    description: String,
    price: { type: Number, required: true },
    countInStock: { type: Number, default: 0 },
    image: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
