import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminProducts(){
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name:'',
    price:'',
    countInStock:'',
    category:'',
    brand:'',
    description:'',
    image: ''       // <-- Add image field here
  });

  const load = async () => {
    const { data } = await api.get('/products');
    setItems(data);
  };

  useEffect(()=>{ load(); },[]);

  const save = async (e) => {
    e.preventDefault();
    // Convert numeric fields
    await api.post('/products', {
      ...form,
      price: Number(form.price),
      countInStock: Number(form.countInStock)
    });
    setForm({
      name:'',
      price:'',
      countInStock:'',
      category:'',
      brand:'',
      description:'',
      image: ''        // <-- reset image field too
    });
    load();
  };

  const del = async (id) => { await api.delete(`/products/${id}`); load(); };

  return (
    <div className="container py-4">
      <h2>Admin • Products</h2>
      <form onSubmit={save} className="card p-3 mb-3">
        <div className="row g-2">
          {['name','price','countInStock','category','brand','description','image'].map(k=>(
            <div key={k} className="col-md-4">
              <input className="form-control" placeholder={k} value={form[k] || ''}
                onChange={e=>setForm({...form, [k]: e.target.value})}/>
            </div>
          ))}
          <div className="col-md-2"><button className="btn btn-success w-100" type="submit">Add</button></div>
        </div>
      </form>

      <div className="table-responsive card p-2">
        <table className="table table-striped">
          <thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Image</th><th></th></tr></thead>
          <tbody>
            {items.map(p=>(
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.countInStock}</td>
                <td>{p.category}</td>
                <td>
                  {p.image ? (
                    <img src={p.image} alt={p.name} style={{width: '60px', height: '40px', objectFit: 'cover'}}/>
                  ) : (
                    'No Image'
                  )}
                </td>
                <td><button className="btn btn-sm btn-outline-danger" onClick={()=>del(p._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
