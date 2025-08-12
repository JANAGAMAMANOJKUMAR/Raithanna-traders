import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  dateAdded: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
