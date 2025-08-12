import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div>
      <section className="header-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h1 className="display-5">Raithanna Traders Fertilizer Store</h1>
              <p className="lead text-secondary">Fresh fertilizer & farm supplies — quality you can trust.</p>
              <Link to="/products" className="btn btn-success">View Products</Link>
            </div>
            <div className="col-md-5 text-center">
              <img src="https://via.placeholder.com/320x220?text=Fertilizer" alt="fertilizer" className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <h3>Quick Links</h3>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="card p-3">
              <h5>Products</h5>
              <p className="small text-muted">Add and manage fertilizers & supplies</p>
              <Link to="/products" className="btn btn-outline-success btn-sm">Manage Products</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h5>Customers</h5>
              <p className="small text-muted">Save customer contacts and history</p>
              <Link to="/customers" className="btn btn-outline-success btn-sm">Manage Customers</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
