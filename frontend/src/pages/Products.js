import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export default function Products(){
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', quantity: '', description: '' });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch products');
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/products`, { 
        name: form.name, 
        price: Number(form.price), 
        quantity: Number(form.quantity),
        description: form.description
      });
      setProducts(prev => [res.data, ...prev]);
      setForm({ name: '', price: '', quantity: '', description: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Products</h2>

      <form onSubmit={addProduct} className="card p-3 mb-4">
        <h5 className="mb-3">Add Product</h5>
        <div className="row g-2">
          <div className="col-md-3"><input className="form-control" placeholder="Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} required/></div>
          <div className="col-md-2"><input className="form-control" placeholder="Price" type="number" value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })} required/></div>
          <div className="col-md-2"><input className="form-control" placeholder="Quantity" type="number" value={form.quantity}
            onChange={e => setForm({ ...form, quantity: e.target.value })} required/></div>
          <div className="col-md-3"><input className="form-control" placeholder="Description" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          <div className="col-md-2"><button className="btn btn-success w-100" type="submit">Add</button></div>
        </div>
      </form>

      <div className="row g-3">
        {products.length === 0 ? (
          <div className="col-12"><p className="text-muted">No products available.</p></div>
        ) : products.map(p => (
          <div key={p._id} className="col-md-4">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
