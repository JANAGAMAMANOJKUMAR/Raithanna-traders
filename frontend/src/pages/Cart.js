import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Cart(){
  const { cart, updateQty, removeFromCart } = useStore();
  const nav = useNavigate();
  const itemsPrice = cart.reduce((s,i)=> s + i.price * i.qty, 0);
  const shippingPrice = itemsPrice > 999 ? 0 : (cart.length ? 49 : 0);
  const total = itemsPrice + shippingPrice;

  return (
    <div className="container py-4">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty. <Link to="/products">Go shopping</Link></p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cart.map(item => (
              <div key={item.product} className="card mb-2 p-3 d-flex flex-row align-items-center">
                <div className="me-3 flex-grow-1">
                  <div className="fw-bold">{item.name}</div>
                  <div>₹{item.price}</div>
                </div>
                <input className="form-control w-auto me-2" type="number" min="1" value={item.qty}
                  onChange={e=>updateQty(item.product, Number(e.target.value))}/>
                <button className="btn btn-outline-danger btn-sm" onClick={()=>removeFromCart(item.product)}>×</button>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h5>Summary</h5>
              <div className="d-flex justify-content-between"><span>Items</span><span>₹{itemsPrice}</span></div>
              <div className="d-flex justify-content-between"><span>Shipping</span><span>₹{shippingPrice}</span></div>
              <hr/>
              <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>₹{total}</span></div>
              <button className="btn btn-success mt-3" onClick={()=>nav('/checkout')} disabled={!cart.length}>Proceed</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
