import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Products(){
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');

  const load = async () => {
    const { data } = await api.get('/products', { params: { q } });
    setItems(data);
  };
  useEffect(()=>{ load(); /* eslint-disable-next-line */ },[]);

  return (
    <div className="container py-4">
      <div className="d-flex mb-3">
        <input className="form-control me-2" placeholder="Search fertilizers, seeds..." value={q}
          onChange={e=>setQ(e.target.value)} />
        <button className="btn btn-success" onClick={load}>Search</button>
        <Link className="btn btn-outline-success ms-2" to="/cart">Cart</Link>
      </div>
      <div className="row g-3">
        {items.map(p=>(
          <div className="col-md-3" key={p._id}><ProductCard p={p} /></div>
        ))}
      </div>
    </div>
  );
}
