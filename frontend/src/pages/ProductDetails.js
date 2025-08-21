import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useStore } from '../context/StoreContext';

export default function ProductDetails(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useStore();

  useEffect(()=>{ (async ()=>{
    const { data } = await api.get(`/products/${id}`);
    setP(data);
  })(); },[id]);

  if(!p) return <div className="container py-5">Loading...</div>;

  const add = () => addToCart({ product: p._id, name: p.name, price: p.price, qty });

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-6">
          <img className="img-fluid rounded" src={p.image || 'https://via.placeholder.com/600x400'} alt={p.name}/>
        </div>
        <div className="col-md-6">
          <h3>{p.name}</h3>
          <p className="text-muted">{p.brand} • {p.category}</p>
          <p>{p.description}</p>
          <h4>₹{p.price}</h4>
          <div className="d-flex align-items-center my-3">
            <input type="number" min="1" max={p.countInStock} value={qty}
              onChange={e=>setQty(Number(e.target.value))} className="form-control w-auto me-2"/>
            <button disabled={p.countInStock===0} className="btn btn-success" onClick={add}>
              {p.countInStock===0 ? 'Out of stock' : 'Add to Cart'}
            </button>
          </div>
          <div>Stock: {p.countInStock}</div>
        </div>
      </div>
    </div>
  );
}
