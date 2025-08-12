import React from 'react';

export default function ProductCard({ product }) {
  const { name, price, quantity, description } = product;
  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-muted mb-1">Price: ₹{price}</p>
        <p className="card-text text-muted">Stock: {quantity}</p>
        <p className="card-text small text-secondary">{description}</p>
        <div className="mt-auto">
          <button className="btn btn-sm btn-outline-success me-2">Order</button>
        </div>
      </div>
    </div>
  );
}
