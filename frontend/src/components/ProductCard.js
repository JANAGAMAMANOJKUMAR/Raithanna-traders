import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ p }){
  return (
    <div className="card h-100">
      <img src={p.image || 'https://via.placeholder.com/400x300?text=Fertilizer'} className="card-img-top" alt={p.name}/>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{p.name}</h6>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold">₹{p.price}</span>
          <Link to={`/product/${p._id}`} className="btn btn-sm btn-success">View</Link>
        </div>
      </div>
    </div>
  );
}
