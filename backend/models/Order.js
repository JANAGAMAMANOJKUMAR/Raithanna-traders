import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  qty: Number,
  price: Number
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
      state: String
    },
    paymentMethod: { type: String, default: 'COD' },
    paymentResult: {   // Optional for payment gateway info
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
