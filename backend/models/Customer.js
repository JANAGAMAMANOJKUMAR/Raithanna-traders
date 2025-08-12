import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  purchaseHistory: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      date: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model('Customer', customerSchema);
