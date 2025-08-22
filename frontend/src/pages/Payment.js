import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Payment() {
  const navigate = useNavigate();
  const { paymentMethod, setPaymentMethod } = useStore();
  
  const [method, setMethod] = useState(paymentMethod || 'COD');

  const handleSubmit = e => {
    e.preventDefault();
    setPaymentMethod(method);
    navigate('/placeorder');
  };

  return (
    <div className="container py-4">
      <h2>Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-check">
          <input 
            type="radio" 
            id="cod" 
            name="paymentMethod" 
            value="COD" 
            checked={method === 'COD'} 
            onChange={e => setMethod(e.target.value)} 
          />
          <label htmlFor="cod">Cash on Delivery (default). You can integrate Razorpay later.</label>
        </div>
        {/* Future payment options go here */}
        <button className="btn btn-primary mt-3" type="submit">Continue</button>
      </form>
    </div>
  );
}
