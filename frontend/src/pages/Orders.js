import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Orders(){
  const [orders, setOrders] = useState([]);

  useEffect(()=>{ (async ()=>{
    const { data } = await api.get('/orders/mine');
    setOrders(data);
  })(); },[]);

  return (
    <div className="container py-4">
      <h2>My Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        orders.map(o => (
          <div className="card p-3 mb-3" key={o._id}>
            <div className="d-flex justify-content-between">
              <div><strong>Order:</strong> {o._id}</div>
              <div><strong>Total:</strong> ₹{o.totalPrice}</div>
            </div>
            <div className="small text-muted">{new Date(o.createdAt).toLocaleString()}</div>
            <ul className="mt-2">
              {o.orderItems.map((it, idx)=>(
                <li key={idx}>{it.name} × {it.qty} — ₹{it.price * it.qty}</li>
              ))}
            </ul>
            <div className="small">Ship to: {o.shippingAddress?.fullName}, {o.shippingAddress?.phone}</div>
          </div>
        ))
      )}
    </div>
  );
}
