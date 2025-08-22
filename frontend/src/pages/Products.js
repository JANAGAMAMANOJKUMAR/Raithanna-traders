import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';
import { Link, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Products() {
  const query = useQuery();
  const category = query.get('category') || '';
  const initialQ = query.get('q') || '';

  const [items, setItems] = useState([]);
  const [q, setQ] = useState(initialQ);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await api.get('/products', {
        params: { q, category }
      });
      setItems(data);
    } catch (err) {
      setError('Error loading products. Please try again.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Load products when category changes or on initial mount
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="container py-4">
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="Search fertilizers, seeds..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button className="btn btn-success" onClick={load}>Search</button>
        <Link className="btn btn-outline-success ms-2" to="/cart">Cart</Link>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row g-3">
        {!loading && !error && items.length === 0 && <p>No products found.</p>}
        {items.map(p => (
          <div className="col-md-3" key={p._id}>
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
