import React, { useState } from 'react';
import api from '../api';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
  const { cart, removeFromCart } = useStore();
  const nav = useNavigate();
  const [addr, setAddr] = useState({ fullName:'', phone:'', address:'', city:'', pincode:'', state:'' });

  const placeOrder = async () => {
    const orderItems = cart.map(c => ({ product: c.product, name: c.name, qty: c.qty, price: c.price }));
    await api.post('/orders', { orderItems, shippingAddress: addr, paymentMethod: 'COD' });
    // clear cart
    cart.forEach(c => removeFromCart(c.product));
    nav('/orders');
  };

  return (
    <div className="container py-4">
      <h2>Checkout</h2>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Shipping Address</h5>
            {['fullName','phone','address','city','pincode','state'].map(k=>(
              <input key={k} className="form-control mb-2" placeholder={k} value={addr[k]}
                onChange={e=>setAddr({ ...addr, [k]: e.target.value })}/>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Payment</h5>
            <p>Cash on Delivery (default). You can integrate Razorpay later.</p>
            <button className="btn btn-success" onClick={placeOrder} disabled={!cart.length}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}
