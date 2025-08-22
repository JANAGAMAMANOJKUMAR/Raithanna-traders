import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import api from '../api'; // Your API utility

export default function PlaceOrder() {
  const { cart, shippingAddress, paymentMethod } = useStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlaceOrder = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const itemsPrice = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
      const shippingPrice = itemsPrice > 999 ? 0 : 49;
      const totalPrice = itemsPrice + shippingPrice;

      const orderData = {
        orderItems: cart,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice
      };

      await api.post('/orders', orderData);
      setLoading(false);

      // Optionally, clear cart here by calling removeFromCart for each item or setting cart to empty

      navigate('/orders');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Failed to place order');
    }
  };

  return (
    <div className="container py-4">
      <h2>Place Order</h2>
      {error && <p className="text-danger">{error}</p>}

      <button className="btn btn-primary" onClick={handlePlaceOrder} disabled={loading}>
        {loading ? 'Placing order...' : 'Place Order'}
      </button>
    </div>
  );
}
