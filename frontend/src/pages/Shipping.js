import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Shipping() {
  const navigate = useNavigate();
  const { shippingAddress, setShippingAddress } = useStore();

  const [form, setForm] = useState({
    fullName: shippingAddress.fullName || '',
    phone: shippingAddress.phone || '',
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    pincode: shippingAddress.pincode || '',
    state: shippingAddress.state || ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setShippingAddress(form);
    navigate('/payment');
  };

  return (
    <div className="container py-4">
      <h2>Shipping Details</h2>
      <form onSubmit={handleSubmit}>
        {['fullName', 'phone', 'address', 'city', 'pincode', 'state'].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field}</label>
            <input
              type="text"
              className="form-control"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Continue to Payment</button>
      </form>
    </div>
  );
}
